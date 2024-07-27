// возвращает аргументы, переданные в командную строку
const getArgs = (args) => {
    const res = {};
    const [executer, file, ...rest] = args;

    rest.forEach((value, index, array) => {
        // если первый элемент начинается с "-" и второй элемент не начинается с "-"
        // (пример -s moscow),
        // записываем в объект (пример {s: "moscow"})
        if (value.startsWith("-")) {
            // получаем флаг (букву)
            const flag = value.slice(1);

            if (index === array.length - 1) {
                // если закончился массив, и следующего значения нет
                // просто записываем в объект, что это значение присутствует
                res[flag] = true;
            } else if (!array[index + 1].startsWith("-")) {
                // если есть следующий элемент и он не является флагом,
                // записываем в объект под флагом
                res[flag] = array[index + 1];
            } else {
                // если есть следующий элемент и он является флагом,
                // просто записываем в объект, что это значение присутствует
                res[flag] = true;
            }
        }
    });

    return res;
};

export { getArgs };
