<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Laravel Socket.io Chat Example</title>
  <link rel="stylesheet" href="{{ URL::asset('css/style.css') }}">
</head>

<body>
  <ul class="pages">

    <li class="chat page">
      <div class="chatArea">
        <ul class="messages"></ul>
      </div>
      <input class="inputMessage" placeholder="Type here..." />
    </li>

    <li class="login page">
      <div class="form">
        <h3 class="title">Halo, siapa namamu ?</h3>
        <input class="usernameInput" type="text" maxlength="14" />
      </div>
    </li>
  </ul>
  <script src="{{ URL::asset('js/app.js') }}"></script>
</body>

</html>