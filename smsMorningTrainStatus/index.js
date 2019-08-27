const axios = require("axios");
module.exports = async function(context, myTimer) {
  const { data } = await axios.get(
    `https://api.tfl.gov.uk/Line/central%2cjubilee%2clondon-overground/Status?detail=true`
  );
  let msg = [];
  data.forEach(line => {
    //Loop through each Train line Status
    line.lineStatuses.forEach(status => {
      //Create Message describing each Line Status
      msg.push(
        `The ${line.name} Line has a ${status.statusSeverityDescription}`
      );

      if (status.statusSeverityDescription !== "Good Service") {
        msg.push(status.reason);
      }
    });
  });

  context.bindings.message = {
    body: msg.join(" "),
    to: "//REPLACE WITH YOUR DESTINATION NUMBER"
  };

  context.done();
};
