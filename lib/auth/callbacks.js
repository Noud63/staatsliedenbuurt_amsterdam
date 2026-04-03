import connectDB from "@/connectDB/database";
import User from "@/models/User";

export const authCallbacks = {
  //Invoked on successful signin
  async signIn({ user, profile, account }) {
    if (account.provider === "google") {
      await connectDB();

      // Find the user in your DB
      const dbUser = await User.findOne({ email: profile.email });

      // If the user doesn't exist, create it
      if (!dbUser) {
        const newUser = await User.create({
          email: profile.email,
          username: profile.given_name,
          name: profile.name,
        });
        return {
          id: newUser._id.toString(),
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
        };
      } else {
        return {
          id: user.id.toString(),
          name: user.name,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        };
      }
    }

    return true;
  },

  async jwt({ token, user, account, trigger, session }) {
    if (user) {
      token.username = user.username;
      token.id = user.id;
      token.avatar = user.avatar;
    }
    if (trigger === "update" && session?.user) {
      token.avatar = session.user.avatar;
    }

    return token;
  },

  //Modify the session object
  async session({ session, token }) {
    session.user.id = token.id;
    session.user.username = token.username;
    session.user.avatar = token.avatar;
    console.log("Session:", session);
    return session;
  },
};
