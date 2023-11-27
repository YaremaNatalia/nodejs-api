import jimp from "jimp";

const processedAvatar = async (req, res, next) => {
  try {
    const { path: avatarPath } = req.file;

    // Зчитування та зміна розмірів аватарки за допомогою Jimp
    const image = await jimp.read(avatarPath);
    await image.resize(250, 250).writeAsync(avatarPath);

    next();
  } catch (error) {
    next(error);
  }
};

export default processedAvatar;
