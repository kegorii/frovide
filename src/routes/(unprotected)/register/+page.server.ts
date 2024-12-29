import { hash, verify } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import {error, fail, redirect} from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from "./schema";
import {superValidate, message , setError} from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import nodemailer from "nodemailer";
import { env } from '$env/dynamic/private';

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_SECRET,
    },
});


export const load: PageServerLoad = async (event) => {
    if (event.locals.user) {
        return redirect(302, '/dashboard');
    }
    return {
        form: await superValidate(zod(formSchema)),
    };
};

export const actions: Actions = {
    default: async (event) => {
        const formData = await superValidate(event.request, zod(formSchema));
        const email = formData.data.email;
        const password = formData.data.password;

        const userId = generateUserId();
        const passwordHash = await hash(password, {
            // recommended minimum parameters
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        });

        const mailOptions = {
            from: "Frovide <no-reply@frovide.com>",
            to: email,
            subject: "[FROVIDE] 이메일인증 번호 안내",
            text: "이메일 인증번호는 03842 입니다. ",
        };

        const results = await db
            .select()
            .from(table.user)
            .where(eq(table.user.email, email));

        const existingUser = results.at(0);
        if (existingUser) {
            return setError(formData, 'email', '이미 등록된 이메일 입니다.');
        }

        try {
            await db.insert(table.user).values({ id: userId, email, passwordHash });

            const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(sessionToken, userId);
            auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
        } catch (e) {
            return message(formData, '회원가입 처리중 에러가 발생하였습니다', {
                status: 500
            });
        }
        await transporter.sendMail(mailOptions);
        return redirect(302, '/verify-email');
    },
};

function generateUserId() {
    // ID with 120 bits of entropy, or about the same as UUID v4.
    const bytes = crypto.getRandomValues(new Uint8Array(15));
    const id = encodeBase32LowerCase(bytes);
    return id;
}

// gmail smtp 앱 비밀번호 pnvl aasu xqdo fsia
// sendgrid recovery code : VK33GJT3QWDCHC7L8TG4Y79L