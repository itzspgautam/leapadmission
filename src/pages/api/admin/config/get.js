import DbConnect from "@/Config/dbConfig";
import Config from "@/models/Config";

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        await DbConnect();

        const config = await Config.find();

        return res.status(201).json({ success: true, config });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

    default:
      return res.status(400).json({ success: false });
  }
};
export default handler;
