$(document).ready(function () {

    function Registration(login, pass) {
        $.ajax({
            url: './reg.php',
            type: 'POST',
            data:
            {
                login: login,
                password: pass
            }
        })
            .done(function () {
                location.href = "index.php";
            })
    }

    function Authorization(login, pass) {
        $.ajax({
            url: './auth.php',
            type: 'POST',
            data:
            {
                login: login,
                password: pass
            },
            dataType: 'JSON'
        })
            .done(function (response) {
                if (response.status == true) {
                    location.href = "index.php";
                }
                else {
                    alert('Что то не так');
                }
            })
    }

    function Logout() {
        $.ajax({
            url: './exit.php',
            type: 'POST'
        })
            .done(function (response) {
                location.reload();
            })
    }

    function addTur(fromCity, country, date, days, cost, description, quantity) {
        $.ajax({
            url: './addTur.php',
            type: 'POST',
            dataType: 'JSON',
            data:
            {
                fromCity: fromCity,
                country: country,
                date: date,
                days: days,
                cost: cost,
                description: description,
                quantity: quantity
            }
        })
            .done(function () {
                alert("Тур был добавлен!")
                getTurs();
            })
    }

    function getTurs() {
        $country = $("#tur-request__country").val();
        $fromCity = $("#tur-request__fromCity").val();
        $date = $("#tur-request__date").val();
        $days = $("#tur-request__days").val();
        $cost = $("#tur-request__persons").val();

        $.ajax({
            url: './turs.php',
            type: 'GET',
            dataType: 'JSON',
            data: {
                country: $country,
                fromCity: $fromCity,
                date: $date,
                days: $days,
                cost: $cost
            },
        })
            .done(function (response) {
                $('.turs__wrapper').empty();
                $.each(response, function (key, value) {
                    $('.turs__wrapper').append(
                        '<div class="tur-block" data-id=' + value.id + '>' +
                        '<div class="tur-block__content">' +
                        '<h3 class="tur-block__title">' + value.country + ' из ' + value.fromCity + ' </h3>' +
                        '<span class="tur-block__cost">' + value.cost + ' руб.</span>' +
                        '<span class="tur-block__date">Вылет ' + value.date + '</span>' +
                        '<span class="tur-block__days">Кол-во дней: ' + value.days + '</span>' +
                        '</div>' +
                        '</div>'
                    )
                })
            })
    }


    function showTur(id) {
        $.ajax({
            url: './getTur.php',
            type: 'GET',
            dataType: 'JSON',
            data:
            {
                id: id
            }
        })
            .done(function (response) {
                $('.main_content').html(
                    '<div class="tur" data-id=' + response["id"] + '>' +
                    '<h1 class="tur__title">Тур в ' + response["country"] + '</h1>' +
                    '<span class="tur__fromCity">Город вылета: ' + response["fromCity"] + '</span>' +
                    '<span class="tur__days">Количество дней: ' + response["days"] + '</span>' +
                    '<p class="tur__description">Описание: ' + response["description"] + '</p>' +
                    '<span class="tur__cost">Стоимость: ' + response["cost"] + ' руб.</span>' +
                    '</div>' +
                    '<button class="tur__button" id="' + response["id"] + '">Купить</button>'
                );
                if (isAdmin) {
                    $('.main_content').append('<button class="tur__delete" id="' + response["id"] + '">Удалить</button>')
                }
            })
    }



    function getReport() {
        $datestart = $("#reports__datestart").val();
        $dateend = $("#reports__dateend").val();
        $type = 0;
        if ($("#revenue").is(":checked")) $type = 1;
        if ($("#turs").is(":checked")) $type = 2;
        if ($("#docs").is(":checked")) $type = 3;

        $.ajax({
            url: './getReport.php',
            type: 'GET',
            dataType: 'JSON',
            data: {
                type: $type,
                datestart: $datestart,
                dateend: $dateend
            },
        })
            .done(function (response) {
                $('.report__wrapper').empty();
                console.log(response);

                if ($type == 1) {
                    $('.report__wrapper').append(
                        '<div class="report-block">' +
                        '<h3 class="report__titl"> Выручка с ' + $datestart + ' по ' + $dateend + ' составила ' + response[0]["SUM(tur.cost)"] + ' руб.</h3>' +
                        '</div>'
                    )
                }

                if ($type == 2) {
                    $('.report__wrapper').append(
                        '<h3 class="report__title">Проданные путевки с ' + $datestart + ' по ' + $dateend + '</h3>' +
                        '<table class="table">' +
                        '<thead class="thead">' +
                        '<tr class="tr">' +
                        '<th class="th">Логин</th>' +
                        '<th class="th">Страна</th>' +
                        '<th class="th">Город вылета</th>' +
                        '<th class="th">Стоимость</th>' +
                        '<th class="th">Дата</th>' +
                        '<th class="th">Количество дней</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody class="tbody">' +

                        '</tbody>' +
                        '</table>'
                    );
                    $.each(response, function (key, value) {
                        $('.tbody').append(
                            '<tr class="report__item" data-id=' + value.id + '>' +
                            '<td class="td">' + value.login + '</td>' +
                            '<td class="td">' + value.country + '</td>' +
                            '<td class="td">' + value.fromCity + '</td>' +
                            '<td class="td">' + value.cost + '</td>' +
                            '<td class="td">' + value.date + '</td>' +
                            '<td class="td">' + value.days + '</td>' +
                            '</tr>'
                        )
                    })
                }

                if ($type == 3) {
                    $('.report__wrapper').append(
                        '<h3 class="report__title">Оформленные документы с ' + $datestart + ' по ' + $dateend + '</h3>' +
                        '<table class="table">' +
                        '<thead class="thead">' +
                        '<tr class="tr">' +
                        '<th class="th">Документ</th>' +
                        '<th class="th">Логин</th>' +
                        '<th class="th">ФИО</th>' +
                        '<th class="th">Телефон</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody class="tbody">' +

                        '</tbody>' +
                        '</table>'
                    );
                    $.each(response, function (key, value) {
                        $title = ""
                        if (value.visa == 1) { $title = "Виза" };
                        if (value.pas == 1) { $title = "Загран. паспорт" };
                        $('.tbody').append(
                            '<tr class="report__item" data-id=' + value.id + '>' +
                            '<td class="td">' + $title + '</td>' +
                            '<td class="td">' + value.login + '</td>' +
                            '<td class="td">' + value.fio + '</td>' +
                            '<td class="td">' + value.phone + '</td>' +
                            '</tr>'
                        )
                    })
                }
            })
    }

    function showDocs() {
        $('.main_content').html(
            '<div class="documents">' +
            '<h3 class="documents__title">Оставить заявку на оформление</h3>' +
            '<div class="documents__form">' +
            '<div class="documents__radiogroups">' +
            '<div class="documents__radiogroup">' +
            '<input name="documents__radiolabel" id="visa" type="radio" class="documents__radiobtn" checked>' +
            '<label class="documents__radiolabel" for="visa">Виза</label>' +
            '</div>' +
            '<div class="documents__radiogroup">' +
            '<input name="documents__radiolabel" id="pas" type="radio" class="documents__radiobtn">' +
            '<label class="documents__radiolabel" for="pas">Загран. паспорт</label>' +
            '</div>' +
            '</div>' +
            '<div class="pas">' +
            '<label for="pas__fio" class="pas__label">Фамилия Имя Отчество*</label>' +
            '<input id="pas__fio" type="text" class="pas__input">' +
            '<label for="pas__tel" class="pas__label">Телефон для связи*</label>' +
            '<input id="pas__tel" type="text" class="pas__input">' +
            '<label for="pas__email" class="pas__label">Электронная почта</label>' +
            '<input id="pas__email" type="text" class="pas__input">' +
            '<label for="pas__com" class="pas__label">Комментарий к заказу</label>' +
            '<input id="pas__com" type="text" class="pas__input">' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        if (idu != '') {
            $('.documents__form').append('<button data-id=' + idu + ' id="pas__button">Оставить заявку</button>');
        } else {
            $('.documents__form').append('<span>Для оформления заявки необходима авторизация</span>');
        }
        console.log('aaa');
        $.ajax({
            url: './getDocs.php',
            type: 'GET',
            dataType: 'JSON',
            data:
            {
                id: idu
            }
        })
            .done(function (response) {
                $('.documents').append(
                    '<h3 class="documents__title">Заявки</h3>' +
                    '<table class="table">' +
                    '<thead class="thead">' +
                    '<tr class="tr">' +
                    '<th class="th">Логин</th>' +
                    '<th class="th">ФИО</th>' +
                    '<th class="th">Телефон</th>' +
                    '<th class="th">Эл. Почта</th>' +
                    '<th class="th">Комментарий</th>' +
                    '<th class="th">Документ</th>' +
                    '<th class="th">Статус</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody class="tbody">' +

                    '</tbody>' +
                    '</table>'
                );
                $.each(response, function (key, value) {
                    $title = ""
                    if (value.visa == 1) { $title = "Виза" };
                    if (value.pas == 1) { $title = "Загран. паспорт" };
                    $status = "";
                    if (value.status == 1) { $status = "Не обработан"; }
                    if (value.status == 2) { $status = "В обработке"; }
                    if (value.status == 3) { $status = "Обработан"; }
                    $('.tbody').append(
                        '<tr class="document__requestItem" data-id=' + value.id + '>' +
                        '<td class="td">' + value.login + '</td>' +
                        '<td class="td">' + value.fio + '</td>' +
                        '<td class="td">' + value.phone + '</td>' +
                        '<td class="td">' + value.email + '</td>' +
                        '<td class="td">' + value.comment + '</td>' +
                        '<td class="td">' + $title + '</td>' +
                        '<td class="td">' + $status + '</td>' +
                        '</tr>'
                    )
                })
            })


    }


    function showReports() {
        $('.main_content').html(
            '<div class="reports">' +
            '<div class="reports__inputs">' +
            '<div class="reports__dates">' +
            '<label class="reports__label" for="reports__datestart">От: </label>' +
            '<input id="reports__datestart" type="date" class="reports__date">' +
            '<label class="reports__label" for="reports__dateend">До: </label>' +
            '<input id="reports__dateend" type="date" class="reports__date">' +
            '</div>' +
            '<div class="reports__radiobtns">' +
            '<input name="reports__radiolabel" id="revenue" type="radio" class="reports__radiobtn" checked>' +
            '<label class="reports__radiolabel" for="revenue">Общая сумма выручки</label>' +
            '<input name="reports__radiolabel" id="turs" type="radio" class="reports__radiobtn">' +
            '<label class="reports__radiolabel" for="turs">Проданные путевки</label>' +
            '<input name="reports__radiolabel" id="docs" type="radio" class="reports__radiobtn">' +
            '<label class="reports__radiolabel" for="docs">Оформленные документы</label>' +
            '</div>' +
            '<button class="reports__button">Вывести</button>' +
            '</div>' +
            '<div class="report">' +
            '<div class="report__wrapper">' +

            '</div>' +
            '</div>' +
            '</div>'
        )
    }


    function showTurs() {
        $('.main_content').html(
            '<img src="./img/breach.jpg" alt="пляж" class="turs__image">' +
            '<div class="tur-request">' +
            '<div class="input__group">' +
            '<label class="tur-request__label" for="tur-request__fromCity">Город вылета*</label>' +
            '<input type="text" id="tur-request__fromCity" class="tur-request__input">' +
            '</div>' +
            '<div class="input__group">' +
            '<label class="tur-request__label" for="tur-request__country">Страна посещения</label>' +
            '<input type="text" id="tur-request__country" class="tur-request__input">' +
            '</div>' +
            '<div class="input__group">' +
            '<label class="tur-request__label" for="tur-request__date">Дата вылета</label>' +
            '<input type="date" id="tur-request__date" class="tur-request__input">' +
            '</div>' +
            '<div class="input__group">' +
            '<label class="tur-request__label" for="tur-request__days">Количество дней</label>' +
            '<input type="number" id="tur-request__days" class="tur-request__input">' +
            '</div>' +
            '<div class="input__group">' +
            '<label class="tur-request__label" for="tur-request__persons">Стоимость до</label>' +
            '<input type="number" id="tur-request__persons" class="tur-request__input">' +
            '</div>' +
            '<button id="request__button">Поиск</button>' +
            '</div>' +
            '<h1 class="turs__title">Выберите тур</h1>' +
            '<div class="turs__wrapper">' +

            '</div>'
        );
        getTurs();
    }


    $(document).on('click', '#registration-btn', function () {
        login = $('#reg-login').val();
        password = $('#reg-password').val();
        Registration(login, password);
    })

    $(document).on('click', '#authorization-btn', function () {
        login = $('#auth-login').val();
        password = $('#auth-password').val();
        Authorization(login, password);
    })

    $(document).on('click', '#logout_button', function () {
        Logout();
    })

    $(document).on('click', '#request__button', function () {
        if ($('#tur-request__fromCity').val() == "") {
            alert("Укажите город вылета!")
            return;
        }
        getTurs();
    })

    $(document).on('click', '#menu__turs', function () {
        showTurs();
    })

    $(document).on('click', '#menu__docs', function () {
        showDocs();
    })

    $(document).on('click', '#menu__reports', function () {
        showReports();
    })

    $(document).on('click', '.reports__button', function () {
        if ($('#reports__datestart').val() == "") {
            alert("Укажите начало периода!")
            return;
        }
        if ($('#reports__dateend').val() == "") {
            alert("Укажите конец периода!")
            return;
        }
        getReport();
    })

    $(document).on('click', '.tur-block', function () {
        console.log($(this).attr('data-id'));
        showTur($(this).attr('data-id'));
    })

    $(document).on('click', '.document__requestItem', function () {
        $id = $(this).attr('data-id');
        $.ajax({
            url: './getDoc.php',
            type: 'GET',
            dataType: 'JSON',
            data:
            {
                id: $id
            }
        })
            .done(function (response) {
                $('.modal_menu').html(
                    '<div class="status-block">' +
                    '<h3 class="status__title">Укажите статус заявки</h3>' +
                    '<div class="status__radiogroup">' +
                    '<input id="net" name="status__input" type="radio" class="status__input">' +
                    '<label for="net" class="status__label">Не обработано</label>' +
                    '</div>' +
                    '<div class="status__radiogroup">' +
                    '<input id="process" name="status__input" type="radio" class="status__input">' +
                    '<label for="process" class="status__label">В процессе</label>' +
                    '</div>' +
                    '<div class="status__radiogroup">' +
                    '<input id="da" name="status__input" type="radio" class="status__input">' +
                    '<label for="da" class="status__label">Готово</label>' +
                    '</div>' +
                    '<button class="status__button" data-id=' + $id + '>Принять</button>' +
                    '</div>'
                )
                if (response.status == 1) {
                    $("#net").prop('checked', true)
                }
                if (response.status == 2) {
                    $("#process").prop('checked', true)
                }
                if (response.status == 3) {
                    $("#da").prop('checked', true)
                }
            })

        $(".modal_menu_wrapper").addClass('--opened');
    })

    $(document).on('click', '.status__button', function () {
        $id = $(this).attr('data-id');
        $status = 0;
        if ($("#net").is(":checked")) {
            $status = 1;
        }
        if ($("#process").is(":checked")) {
            $status = 2;
        }
        if ($("#da").is(":checked")) {
            $status = 3;
        }
        $.ajax({
            url: './setStatusDoc.php',
            type: 'POST',
            dataType: 'JSON',
            data:
            {
                id: $id,
                status: $status
            }
        })
            .done(function (response) {
                alert('Статус был обновлен!')

                $(".modal_menu_wrapper").removeClass('--opened');

            })

    })

    $(document).on('click', '#add__tur-block-btn', function () {
        if ($('#add__fromCity').val() == "") {
            alert("Заполните поле 'Город вылета'!")
            return;
        }
        if ($('#add__country').val() == "") {
            alert("Заполните поле 'Страна'!")
            return;
        }
        if ($('#add__date').val() == "") {
            alert("Заполните поле 'Дата'!")
            return;
        }
        if ($('#add__days').val() == "") {
            alert("Заполните поле 'Количество дней'!")
            return;
        }
        if ($('#add__cost').val() == "") {
            alert("Заполните поле 'Стоимость'!")
            return;
        }
        if ($('#add__img').val() == "") {
            alert("Заполните поле 'Количество'!")
            return;
        }
        add__fromCity = $('#add__fromCity').val();
        add__country = $('#add__country').val();
        add__date = $('#add__date').val();
        add__days = $('#add__days').val();
        add__cost = $('#add__cost').val();
        add__description = $('#add__description').val();
        add__img = $('#add__img').val();

        addTur(add__fromCity, add__country, add__date, add__days, add__cost, add__description, add__img);
    })

    $(document).on("click", ".modal_menu_wrapper", function (e) {
        if ($(e.target).closest('.modal_menu').length <= 0) {
            $(".modal_menu_wrapper").removeClass('--opened');
        }
    })



    $(document).on("click", ".tur__delete", function () {
        let id = $(this).attr("id");
        $.ajax({
            url: './deleteTur.php',
            type: 'POST',
            dataType: 'JSON',
            data:
            {
                id: id
            }
        })
            .done(function (response) {
                alert('Тур был удалён!');
            })

    })

    $(document).on("click", ".tur__button", function () {
        let id = $(this).attr("id");
        $.ajax({
            url: './getTur.php',
            type: 'GET',
            dataType: 'JSON',
            data:
            {
                id: id
            }
        })
            .done(function (response) {
                $('.modal_menu').html(
                    '<div class="buy__tur-block">' +
                    '<h1 class="buy__title">Купить путевку</h1>' +

                    '<h2 class="buy__tur-title"></h2>' +
                    '<span class="buy__tur-fromCity"></span>' +
                    '<span class="buy__tur-days"></span>' +
                    '<p class="buy__tur-description"></p>' +
                    '<span class="buy__tur-cost"></span>' +

                    '<label for="buy__address" class="buy__label">Адрес*:</label>' +
                    '<input id="buy__address" class="buy__input" type="text">' +

                    '<label for="buy__name" class="buy__label">Имя (латиницей):</label>' +
                    '<input id="buy__name" class="buy__input" type="text">' +
                    '<label for="buy__surname" class="buy__label">Фамилия (латиницей):</label>' +
                    '<input id="buy__surname" class="buy__input" type="text">' +

                    '<label for="buy__birthday" class="buy__label">Дата рождения:</label>' +
                    '<input id="buy__birthday" class="buy__input" type="date">' +

                    '<label for="buy__sex" class="buy__label">Пол:</label>' +
                    '<input id="buy__sex" class="buy__input" type="text">' +

                    '<label for="buy__serialPass" class="buy__label">Серия паспорта:</label>' +
                    '<input id="buy__serialPass" class="buy__input" type="text">' +

                    '<label for="buy__numberPass" class="buy__label">Номер паспорта:</label>' +
                    '<input id="buy__numberPass" class="buy__input" type="text">' +

                    '<label for="buy__dateFromPass" class="buy__label">Дата выдачи:</label>' +
                    '<input id="buy__dateFromPass" class="buy__input" type="date">' +

                    '<label for="buy__dateToPass" class="buy__label">Годен до:</label>' +
                    '<input id="buy__dateToPass" class="buy__input" type="date">' +

                    '</div>'
                );
                if (idu != '') {
                    $('.buy__tur-block').append('<button data-id=' + response["id"] + ' id="buy__tur-block-btn">Оплатить</button>');
                } else {
                    $('.buy__tur-block').append('<span>Для покупки необходима авторизация</span>');
                }

                $(".modal_menu_wrapper").addClass('--opened');
            })

    })


    $(document).on("click", "#addTur", function () {
        $('.modal_menu').html(
            '<div class="add__tur-block">' +
            '<label for="add__fromCity" class="add__label">Город вылета*:</label>' +
            '<input id="add__fromCity" class="add__input" type="text">' +

            '<label for="add__country" class="add__label">Страна*:</label>' +
            '<input id="add__country" class="add__input" type="text">' +

            '<label for="add__date" class="add__label">Дата*:</label>' +
            '<input id="add__date" class="add__input" type="date">' +

            '<label for="add__days" class="add__label">Количество дней*:</label>' +
            '<input id="add__days" class="add__input" type="number">' +

            '<label for="add__cost" class="add__label">Стоимость*:</label>' +
            '<input id="add__cost" class="add__input" type="number">' +

            '<label for="add__description" class="add__label">Описание:</label>' +
            '<input id="add__description" class="add__input" type="text">' +

            '<label for="add__img" class="add__label">Количество:</label>' +
            '<input id="add__img" class="add__input" type="number">' +

            '<button id="add__tur-block-btn">Добавить</button>' +
            '</div>'
        );
        $(".modal_menu_wrapper").addClass('--opened');
    })

    $(document).on("click", "#pas__button", function (e) {

        if ($('#pas__fio').val() == "") {
            alert("Заполните поле 'ФИО'!")
            return;
        }
        if ($('#pas__tel').val() == "") {
            alert("Заполните поле 'Телефон'!")
            return;
        }

        let id = $(this).attr("data-id");

        $pas = 0;
        $visa = 0;
        if ($("#pas").is(":checked")) $pas = 1;
        if ($("#visa").is(":checked")) $visa = 1;

        $fio = $("#pas__fio").val();
        $phone = $("#pas__tel").val();
        $email = $("#pas__email").val();
        $comment = $("#pas__com").val();

        $.ajax({
            url: './requestDoc.php',
            type: 'POST',
            data:
            {
                id: id,
                pas: $pas,
                visa: $visa,
                fio: $fio,
                phone: $phone,
                email: $email,
                comment: $comment
            }
        })
            .done(function () {
                alert("Вы оставили заявку на оформление");
            })
    })

    $(document).on("click", "#buy__tur-block-btn", function (e) {
        let id = $(this).attr("data-id");
        $address = $("#buy__address").val();
        $name = $("#buy__name").val();
        $surname = $("#buy__surname").val();
        $dateofbirth = $("#buy__birthday").val();
        $sex = $("#buy__sex").val();
        $serialpas = $("#buy__serialPass").val();
        $numberpas = $("#buy__numberPass").val();
        $datefrom = $("#buy__dateFromPass").val();
        $dateto = $("#buy__dateToPass").val();
        $.ajax({
            url: './buyTur.php',
            type: 'POST',
            data:
            {
                id: id,
                address: $address,
                name: $name,
                surname: $surname,
                dateofbirth: $dateofbirth,
                sex: $sex,
                serialpas: $serialpas,
                numberpas: $numberpas,
                datefrom: $datefrom,
                dateto: $dateto
            }
        })
            .done(function () {
                alert("Вы купили тур");
            })
    })

    showTurs();
});


