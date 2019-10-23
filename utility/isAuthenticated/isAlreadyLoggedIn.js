import nextCookie from "next-cookies";

const isAlreadyLoggedIn = ctx => {
  const { token } = nextCookie(ctx);

  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (ctx.req && token) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
  }

  // We already checked for server. This should only happen on client.
  if (token) {
    Router.push("/");
  }

  return token;
};

export default isAlreadyLoggedIn;
