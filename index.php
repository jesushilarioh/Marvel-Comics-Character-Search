<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <!-- Bootstrap CSS -->
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <title>Marvel Comics API Search - Character</title>

    <link rel="stylesheet" href="style.css">

</head>
<body onload="characters()">
    <div class="jumbotron">
        <div class="container">
            <h1 class="header-main-title">Marvel Comics Character Search</h1>
            <form id="connectionForm">
            
                <div class="form-group">
                    <input type="text" name="name" id="name" class="form-control character-search-box" placeholder="(Ex. Hulk, Iron Man, Spider-Man, etc...)">
                </div>
                <input type="submit" value="Search!" class="btn btn-danger mb-2 float-right search-character-button">

            </form>
        </div>
    </div>

    <div class="container">
        <section id="characterSection">
            <div class="card flex-md-row mb-4 box-shadow h-md-250" id="characterCard">
                <div id="characterImage"></div>
                <div class="card-body d-flex flex-column align-items-start">
                    <h3 class="mb-0 text-dark" id="characterName"></h3>
                    <p class="card-text" id="characterDescription"></p>
                    <p class="text-muted mb-3" id="comicsAvailable"></p>
                    <p class="mb-1 text-muted" id="characterInfoAttribution"></p>
                    <!-- <a href="#comicSection">Comics</a> -->
                </div>
            </div>

        </section>

        <section id="comicSection"></section>
    </div>
    
    
    <script src="main.js"></script>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html>