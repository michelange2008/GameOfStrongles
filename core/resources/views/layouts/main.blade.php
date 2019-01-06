<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Game of Strongles</title>

        <!-- Fonts -->
        {{-- <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css"> --}}
        <link href="{{URL::asset('core/public/css')}}/app.css" rel="stylesheet" type="text/css" />
        <link href="{{URL::asset('core/public/css')}}/jquery-confirm.css" rel="stylesheet" type="text/css" />
        {{-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css"> --}}
        <!-- Styles -->

    </head>
    <body>
      @yield('entete')
      @yield('menu')
      @yield('content')
      @yield('param')
      @yield('gos')
      @yield('pied_de_page')

      <!-- <script
           src="https://code.jquery.com/jquery-3.3.1.min.js"
           integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
           crossorigin="anonymous"></script>
           <script src="{{asset('core/public/js/jquery-ui.min.js')}}"></script>
           src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
           integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
           crossorigin="anonymous"></script>
           <script src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
           <script
           src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
           integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
           crossorigin="anonymous"></script>
       <script src="https://unpkg.com/draggabilly@2/dist/draggabilly.pkgd.min.js"></script>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js"></script>
       <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script> -->
       <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
      <script src="{{asset('core/public/js/jquery-3.3.1.min.js')}}"></script>
      <script src="{{asset('core/public/js/jquery-ui-1.12.1.custom/jquery-ui.js')}}"></script>
      <script src="{{asset('core/public/js/jQRangeSlider-5.7.2/jQDateRangeSlider-withRuler-min.js')}}"></script>
      <script src="{{asset('core/public/js/fonctions_base.js')}}"></script>
      <script src="{{asset('core/public/js/gos.js')}}"></script>
      {{-- <script src="{{asset('core/public/js/jquery.cookie.js')}}"></script> --}}
      <script src="{{asset('core/public/js/constantes.js')}}"></script>
      <script src="{{asset('core/public/js/troupeau.js')}}"></script>
      <script src="{{asset('core/public/js/dates.js')}}"></script>
      <script src="{{asset('core/public/js/foncier.js')}}"></script>
      <script src="{{asset('core/public/js/pature.js')}}"></script>
      <script src="{{asset('core/public/js/parcelle.js')}}"></script>
      <script src="{{asset('core/public/js/strongle.js')}}"></script>
      <script src="{{asset('core/public/js/fonctions.js')}}"></script>
      <script src="{{asset('core/public/js/jquery-confirm.min.js')}}"></script>
      <script src="{{asset('core/public/js/draggabilly.pkgd.min.js')}}"></script>
      <script src="{{asset('core/public/js/masonry.pkgd.min.js')}}"></script>
    </body>
</html>
