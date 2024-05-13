import { Freebox } from "@piarre/ts-freebox";

(async () => {
  const box = new Freebox({
    app_id: "fr.piarre.dev",
    app_name: "test1",
    app_version: "0.2.1",
    device_name: "test1",
    app_token: "uT4a5X+inmSqpJS4XHAaV46f46dm+QB5l8z3HSrOSLA+IlZdKOfelo2KTbhEOx32",
  });
  await box.login();

  console.log("🚀 --------------------------------------------------🚀");
  console.log("🚀 ~ await box.LAN.hosts():", await box.LAN.hosts());
  console.log("🚀 --------------------------------------------------🚀");
})();
