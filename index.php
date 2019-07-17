<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

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

    <div class="container" id="contentContainer">

        <div class="d-flex align-items-center" id="characterSpinnerSection"></div>
        <div class="d-flex align-items-center" id="comicsSpinnerSection"></div>

        <section id="characterSection">
            <h2 id="characterMainTitle"></h2>
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
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>