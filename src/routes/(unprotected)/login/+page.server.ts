import { hash, verify } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import {error, fail, redirect} from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from "./schema";
import {superValidate, setError} from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";


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

        const results = await db
            .select()
            .from(table.user)
            .where(eq(table.user.email, email));

        const existingUser = results.at(0);
        if (!existingUser) {
            return setError(formData, 'email', '등록된 이메일이 아닙니다.');

        }

        const validPassword = await verify(existingUser.passwordHash, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        });
        if (!validPassword) {
            return setError(formData, 'password', '비밀번호가 일치하지 않습니다.');
        }

        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, existingUser.id);
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

        return redirect(302, '/dashboard');
    },
};