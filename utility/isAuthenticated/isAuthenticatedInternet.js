import nextCookie from "next-cookies";

const isAuthenticatedInternet = ctx => {
  const { token, loginType } = nextCookie(ctx);

  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (
    ctx.req &&
    !token &&
    (loginType !== 1 || loginType !== 2 || loginType !== 3)
  ) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }

  // We already checked for server. This should only happen on client.
  if (!token && (loginType !== 1 || loginType !== 2 || loginType !== 3)) {
    Router.push("/login");
  }

  return token;
};

export default isAuthenticatedInternet;
