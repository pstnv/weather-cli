// библиотека, подсвечивает тексты (фон, цвет текста и т.д.)
import chalk from "chalk";
// библиотека, убирает лишние отступы
import dedent from "dedent";

// выводит сообщение об ошибке
const printError = (error) => {
    console.log(chalk.bgRed(" ERROR ") + ` ${error}`);
};

// выводит сообщение об успешной операции
const printSuccess = (message) => {
    console.log(chalk.bgGreen(" SUCCESS ") + ` ${message}`);
};

// выводит справку
const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(" HELP ")}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h [CITY] для вывода помощи
        -t [API_KEY] для сохранения токена
        `
    );
};

const printWeather = ({ weather, icon }) => {
    console.log(
        dedent`${chalk.bgYellow(" WEATHER ")} Погода в городе ${weather.name}
        ${icon}  ${weather.weather[0].description}
        Температура: ${weather.main.temp} (ощущается как ${weather.main.feels_like})
        Влажность: ${weather.main.humidity}
        Скорость ветра: ${weather.wind.speed}
        `
    );
};

export { printError, printSuccess, printHelp, printWeather };
