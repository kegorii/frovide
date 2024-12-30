import type { PageServerLoad } from './$types';
import {db} from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import {eq} from "drizzle-orm";
import { db } from '$lib/server/db';
import {setError} from "sveltekit-superforms";
import {error, redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url }) => {

    const urlCode = url.pathname.split('/').at(2);
    console.log('urlCode: ' + urlCode);
    const results = await db
        .select()
        .from(table.user)
        .where(eq(table.user.emailVerifyCode, urlCode));
    console.log('results: ' + results.length);
    const existingCode = results.at(0);
    if (!existingCode) {
        return error(404);
    }else{
        await db.update(table.user)
            .set({ emailVerified: true})
            .where(eq(table.user.id, results.at(0).id));
        return redirect(302, '/dashboard');
    }
};