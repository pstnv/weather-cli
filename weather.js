#! /usr/bin/env node

import { getArgs } from "./helpers/args.js";
import {
    printError,
    printSuccess,
    printHelp,
    saveKeyValue,
    getKeyValue,
    TOKEN_DICTIONARY,
    getWeather,
    printWeather,
    getIcon,
} from "./services/index.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError("Не передан токен");
        return;
    }
    try {
        await saveKeyValue({ key: TOKEN_DICTIONARY.token, value: token });
        printSuccess("Токен сохранен");
    } catch (error) {
        printError(error.message);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError("Не передан город");
        return;
    }
    try {
        await saveKeyValue({ key: TOKEN_DICTIONARY.city, value: city });
        printSuccess("Город сохранен");
    } catch (error) {
        printError(error.message);
    }
};

const getForecast = async () => {
    try {
        const city =
            process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
        const weather = await getWeather(process.env.CITY);
        const icon = await getIcon(weather.weather[0].icon);
        printWeather({ weather, icon });
    } catch (e) {
        if (e?.response?.status == 404) {
            printError("Неверно указан город");
        } else if (e?.response?.status == 401) {
            printError("Неверно укзан токен");
        } else {
            printError(e.message);
        }
    }
};

const initCLI = () => {
    // аргументы, переданные через командную строку
    const args = getArgs(process.argv);
    if (args.h) {
        // вывод help
        return printHelp();
    }
    if (args.s) {
        // сохранить город
        return saveCity(args.s);
    }
    if (args.t) {
        // сохранить токен
        return saveToken(args.t);
    }
    // если ничего не передано
    // вывести погоду
    return getForecast();
};

initCLI();
