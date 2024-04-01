import { createServer } from "./server";
import { createLowdbSessions } from "./sessions";
import { createVerifyAuth } from "./middleware";

createLowdbSessions()
  .then((sessions) => {
    const verifyAuth = createVerifyAuth(sessions);

    createServer(sessions, verifyAuth).listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch((error) => {
    console.log(error);
  });
