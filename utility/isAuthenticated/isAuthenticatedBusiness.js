import nextCookie from "next-cookies";
import Router from "next/router";

const isAuthenticatedBusiness = ctx => {
  const { token, loginType } = nextCookie(ctx);

  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (ctx.req && !token && loginType !== 4) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }

  // We already checked for server. This should only happen on client.
  if (!token && loginType !== 4) {
    Router.push("/login");
  }

  return token;
};

export default isAuthenticatedBusiness;
