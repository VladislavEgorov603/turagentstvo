<?php
if (!isset($_SESSION)) {
  session_start();
}
$is_admin = isset($_SESSION['admin']) == 1 ;
echo '<script>';
echo 'var isAdmin = ' . ($is_admin ? 'true' : 'false') . ';'; 
echo '</script>';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="/style/reset.css">
  <link rel="stylesheet" href="/style/style.css">
  <title>Мирные тропы</title>
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <a href="/index.php" class="logo"><img src="./img/logo.avif" alt="" class="logo-img"> Мирные тропы</a>
        <nav class="menu">
          <ul class="menu__list">
            <li class="menu__item"><a id="menu__turs" class="menu__link">Туры</a></li>
            <li class="menu__item"><a id="menu__docs" class="menu__link">Оформить документы</a></li>
            <?php
            if (isset($_SESSION['admin']) == 1) {
              echo '<li class="menu__item"><a id="menu__reports" class="menu__link">Отчёты</a></li>';
              echo '<li class="menu__item"><a id="addTur"  class="menu__link">Добавить тур</a></li>';
            }
            ?>
          </ul>
        </nav>
        <div class="menu__logout">
          <?php
          if (isset($_SESSION['user_id'])) {
            $name = $_SESSION['username'];
            echo "<p>Вы вошли как $name</p><button id='logout_button' class='logout_button'>Выйти</button>";
          } else {
            echo '<a href="/authorization.php" class="authorization_button">Войти</a>';
          }
          ?>
        </div>

      </div>
    </div>
  </header>
  <div class="modal_menu_wrapper">
    <div class="modal_menu">
    </div>
  </div>
  <div class="main">
    <div class="container">
      <div class="main_content">
        <div class="navigation_wrapper"></div>
      </div>
    </div>
  </div>
  <footer>
    <div class="footer-wrapper">
      <div class="footer-block">
        <div class="footer-block--main_information">
          <ul>
            <li>ОАО "Мирные тропы"</li>
            <li>ИНН: 6263231252</li>
            <li>ОГРН: 1000007128527</li>
            <li>440011, Пензенская область, г. Пенза, ул. Карпинского 21</li>
          </ul>
        </div>
      </div>
      <div class="footer-block">
        <p class="footer-block--title">Мирные тропы</p>
        <ul>
          <li>Туры</li>
          <li>Новости</li>
          <li>Контакты</li>
        </ul>
      </div>
      <div class="footer-block">
        <p class="footer-block--title">Партнерам</p>
        <ul>
          <li>Стать партнером</li>
        </ul>
      </div>
      <div class="footer-block--contacts">
        <p class="footer-block--contacts_phone">
          <object type="image/svg+xml" data="img/phone_icon.svg">
          </object>
          8 800 555-22-66
        </p>
        <p>mail@mirnietropi.com</p>
      </div>
    </div>
  </footer>
  <script type="text/javascript">
    let idu = '<?php echo $_SESSION['user_id'] ?>';
  </script>
  <script src="/js/jquery-3.6.3.min.js"></script>
  <script src="/js/main.js"></script>
</body>
</html>