<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="public/css/perso.css">
        <!-- Styles -->

    </head>
    <body>
      <div class="paturage">
        <div id="chevrerie" class="etable">
          <div id="troupeau" class="flock" espece="caprins" taille=50 infestation=0 lieu="chevrerie">
        </div>

        </div>
        @foreach($parcelles as $parcelle)
          <div id="pature_{{$i}}" class="pature" troupeau = false nom = 'nom_{{$i}}'>

          </div>
        @endforeach
    </div>



      <script
      			  src="https://code.jquery.com/jquery-3.3.1.min.js"
      			  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      			  crossorigin="anonymous"></script>
      <script
      			  src="http://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
      			  integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
      			  crossorigin="anonymous"></script>
      <script src="https://unpkg.com/draggabilly@2/dist/draggabilly.pkgd.min.js"></script>
      <script src="public/js/gos.js" type="text/javascript">

      </script>
    </body>
</html>
