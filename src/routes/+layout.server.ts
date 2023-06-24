import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    const { session, user } = await locals.auth.validateUser();
    if (user) {
        const userDetail = await prisma.authUser.findUnique({
            where: {
                id: user.userId
            }
        });
        return { userDetail };
    }
}