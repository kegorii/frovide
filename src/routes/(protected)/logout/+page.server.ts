import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad =  (event) => {
    if (!event.locals.session) {
        return fail(401);
    }
    auth.invalidateSession(event.locals.session.id);
    auth.deleteSessionTokenCookie(event);

    return redirect(302, '/login');
};