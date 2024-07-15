<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style/reset.css">
  
<link rel="stylesheet" href="/style/style.css">
  <title>Регистрация</title>
</head>

<body>
  <div class="registration_block">
    <div class="modal_inputs">
      <p class="field-title">Логин</p>
      <input id="reg-login" type='text'>
    </div>
    <div class="modal_inputs">
      <p class="field-title">Пароль</p>
      <input id="reg-password" type='password'>
    </div>
    <div class="modal_inputs">
      <p class="field-title">Повторите пароль</p>
      <input type='password'>
    </div>
    <button id='registration-btn'>Зарегистрироваться</button>
    <a href="/authorization.php" class="auth_link">Уже зарегистрированы? Авторизоваться</a>
  </div>
  <script src="/js/jquery-3.6.3.min.js"></script>
    <script src="/js/main.js"></script>
</body>

</html>