import { homedir } from "os";
import { join } from "path";
import { writeFile, readFile, stat } from "fs/promises";

// путь, куда будет сохраняться файл с настройками пользователя
const filePath = join(homedir(), "weather.data.json");

const TOKEN_DICTIONARY = {
    token: "token",
    city: "city",
};

const saveKeyValue = async ({ key, value }) => {
    let data = {};
    // если файл с настройками существует,
    // читаем данные из файла в объект данных
    if (await isExists(filePath)) {
        const file = await readFile(filePath);
        data = JSON.parse(file);
    }
    // добавляем или меняем значение флага key
    data[key] = value;
    // записываем (или перезаписываем) данные в файл
    await writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
    if (await isExists(filePath)) {
        const file = await readFile(filePath);
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined;
};

//проверяет, что файл по указанному пути существует
const isExists = async (path) => {
    try {
        // запросить статистику пофайлу
        // если файл существует - выдаст статистику, вернем true
        await stat(path);
        return true;
    } catch (error) {
        // если файл не существует - выбросит ошибку, вернем false
        return false;
    }
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
