const prisma = require("../db");

// 📌 Хэрэглэгч бүртгэх
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: { username, password },
    });

    res.json({ message: "Хэрэглэгч амжилттай бүртгэгдлээ!", user });
  } catch (error) {
    res.status(500).json({ error: "Бүртгэл хийхэд алдаа гарлаа!" });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Нэвтрэх нэр эсвэл нууц үг буруу байна!" });
    }

    res.json({ message: "Амжилттай нэвтэрлээ!", user });
  } catch (error) {
    res.status(500).json({ error: "Нэвтрэхэд алдаа гарлаа!" });
  }
};
