const sleep = async (ms = 1000) => await new Promise((resolve) => setTimeout(resolve, ms));

export default sleep;
