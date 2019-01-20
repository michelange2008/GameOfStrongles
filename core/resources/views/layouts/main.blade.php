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
        <link rel="stylesheet" href="{{URL::asset('core/public/js/timeglider')}}/css/jquery-ui-1.10.3.custom.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="{{URL::asset('core/public/js/timeglider')}}/timeglider/Timeglider.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="{{URL::asset('core/public/js/timeglider')}}/timeglider/timeglider.datepicker.css" type="text/css" charset="utf-8">
        {{-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css"> --}}
        <!-- Styles -->

    </head>
    <body>
      @yield('entete')
      @yield('menu')
      @yield('content')
      @yield('param')
      @yield('gos')
      @yield('planning')
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
      <script src="{{asset('core/public/js/plugin/jquery-3.3.1.min.js')}}"></script>
      <script src="{{asset('core/public/js/jquery-ui-1.12.1.custom/jquery-ui.js')}}"></script>
      <script src="{{asset('core/public/js/jQRangeSlider-5.7.2/jQDateRangeSlider-withRuler-min.js')}}"></script>
      <script src="{{asset('core/public/js/fonctions_base.js')}}"></script>
      <script src="{{asset('core/public/js/gos.js')}}"></script>
      <!-- <script src="{{asset('core/public/js/plugin/jquery.cookie.js')}}"></script> -->
      <script src="{{asset('core/public/js/constantes.js')}}"></script>
      <script src="{{asset('core/public/js/classe-troupeau.js')}}"></script>
      <script src="{{asset('core/public/js/classe-dates.js')}}"></script>
      <script src="{{asset('core/public/js/classe-foncier.js')}}"></script>
      <script src="{{asset('core/public/js/classe-pature.js')}}"></script>
      <script src="{{asset('core/public/js/classe-parcelle.js')}}"></script>
      <script src="{{asset('core/public/js/classe-strongle.js')}}"></script>
      <script src="{{asset('core/public/js/dialogues.js')}}"></script>
      <script src="{{asset('core/public/js/mise-en-place.js')}}"></script>
      <script src="{{asset('core/public/js/plugin/jquery-confirm.min.js')}}"></script>
      <script src="{{asset('core/public/js/plugin/draggabilly.pkgd.min.js')}}"></script>
      <script src="{{asset('core/public/js/plugin/masonry.pkgd.min.js')}}"></script>

      <script src="{{asset('core/public/js/timeglider/js/underscore-min.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/js/backbone-min.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/js/json2.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/js/jquery.tmpl.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/js/ba-tinyPubSub.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/js/jquery.mousewheel.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/js/jquery.ui.ipad.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/js/globalize.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/js/ba-debug.min.js')}}" type="text/javascript" charset="utf-8"></script>

      <script src="{{asset('core/public/js/timeglider/timeglider/TG_Date.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/timeglider/TG_Org.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/timeglider/TG_Timeline.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/timeglider/TG_TimelineView.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/timeglider/TG_Mediator.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/timeglider/timeglider.timeline.widget.js')}}" type="text/javascript" charset="utf-8"></script>
      <script src="{{asset('core/public/js/timeglider/timeglider/timeglider.datepicker.js')}}" type="text/javascript" charset="utf-8"></script>
    </body>
</html>
