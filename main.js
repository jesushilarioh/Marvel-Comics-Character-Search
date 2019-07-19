function character() {
    document.getElementById("characterCard").style.borderStyle = "hidden";

    document.getElementById('connectionForm')
        .addEventListener('submit', connection);

    function connection(e) {
        e.preventDefault();

        document.getElementById("characterCard")
                .style.borderStyle = "hidden";

        document.getElementById("characterMainTitle")
                .innerHTML = '';

        document.getElementById('characterImage')
            .innerHTML = '';

        document.getElementById('characterName')
            .innerHTML = '';

        document.getElementById('characterDescription')
            .innerText = '';

        document.getElementById('characterSpinnerSection')
            .innerHTML = '';

        document.getElementById('comicsSpinnerSection')
            .innerHTML = '';

        document.getElementById("comicsAvailable")
            .innerText = '';

        document.getElementById('characterInfoAttribution')
            .innerText = '';

        document.getElementById('comicSection').innerHTML = '';

        var xhr = new XMLHttpRequest();
        var name = document.getElementById('name').value;
        var params = "name=" + name;

        xhr.open('GET', '/connections/name-search.php?' + params, true);

        xhr.onloadstart = function() {
            document.getElementById('characterSpinnerSection')
                    .innerHTML =
                    '<strong id="spinnerText">Loading character...</strong>' +
                    '<div class="spinner-border ml-auto" role="status" ' +
                    'aria-hidden="true" id="spinner"></div>';
        }
    
        xhr.onloadend = function() {
            document.getElementById('characterSpinnerSection').innerHTML = '';
        }

        xhr.onload = function () {
            if (this.status == 200) {
                var results = JSON.parse(this.responseText);

                if (results["data"].count === 0) {
                    document.getElementById("characterCard").style.borderStyle = "hidden";

                    document.getElementById("characterMainTitle")
                            .innerHTML = '';

                    document.getElementById('characterImage')
                        .innerHTML = '';

                    document.getElementById('characterName')
                        .innerHTML = 'No results for... ' + name;

                    document.getElementById('characterDescription')
                        .innerText = '';

                    document.getElementById('characterSpinnerSection')
                        .innerHTML = '';

                    document.getElementById('comicsSpinnerSection')
                        .innerHTML = '';

                    document.getElementById("comicsAvailable")
                        .innerText = '';

                    document.getElementById('characterInfoAttribution')
                        .innerText = '';

                    document.getElementById('comicSection').innerHTML = '';
                } else {
                    document.getElementById("characterCard").style.borderStyle = "solid";

                    var characterAttributes = results["data"].results[0];
                    var characterID = results["data"].results[0].id;
                    var output = '';

                    output =
                        '<img class="card-img-right flex-auto d-md-block img-fluid"' +
                        ' alt="Picture of ' + characterAttributes.name +
                        '" src="' + characterAttributes.thumbnail["path"] +
                        '.' + characterAttributes.thumbnail["extension"] +
                        '">';

                    document.getElementById('characterImage')
                        .innerHTML = output;

                    document.getElementById('characterName')
                        .innerText = characterAttributes.name;

                    if (characterAttributes.description !== '') {
                        document.getElementById("characterDescription").classList.add("mb-3");
                        document.getElementById('characterDescription')
                            .innerText = characterAttributes.description;
                    }

                    document.getElementById("comicsAvailable")
                        .innerText =
                        'Comics: ' + characterAttributes.comics.available + ' | ' +
                        'Series: ' + characterAttributes.series.available + ' | ' +
                        'Stories: ' + characterAttributes.stories.available + ' | ' +
                        'Events: ' + characterAttributes.events.available;

                    document.getElementById('characterInfoAttribution')
                        .innerText = results["attributionText"];

                    comics(characterID);

                }

            } else {
                console.log("onload error...");
            }
        }

        xhr.onerror = function () {
            console.log("onerror Error...");
        }

        xhr.send();
    }
}


function comics(characterID) {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/connections/character.php?character-id=' + characterID, true);

    xhr.onloadstart = function() {
        document.getElementById('comicsSpinnerSection')
                .innerHTML =
                '<strong id="spinnerText" class="text-danger">Loading comics below...</strong>' +
                '<div class="spinner-border text-danger ml-auto" role="status" ' +
                'aria-hidden="true" id="spinner"></div>';
    }

    xhr.onloadend = function() {
        document.getElementById('comicsSpinnerSection')
            .innerHTML = '<strong id="spinnerText" class="text-success">Done.</strong>';
    }

    xhr.onload = function () {
        if (this.status === 200) {

            var results = JSON.parse(this.responseText);
            var comics = results["data"].results;
            var comicSection = document.getElementById('comicSection');

            if (results["data"].count === 0) {
                var output = '';
                comicSection.innerHTML = output;
                comicSection.innerHTML = '<h2>No comics Available</h2>';
            } else {
                // comics available
                var output = '';
                var creators = '';

                output +=
                    '<h2>Comics</h2>' +
                    '<div class="card-columns">';

                for (const i in comics) {
                    if (comics.hasOwnProperty(i)) {
                        const comic = comics[i];

                        output +=
                            '<div class="card">' +
                            '<a href=""><img src="' + comic.thumbnail["path"] +
                            '.' + comic.thumbnail["extension"] +
                            '" class="card-img-top" alt="' + comic.title + '"></a>' +
                            '<div class="card-body">' +
                            '<h5 class="card-title">' + comic.title + '</h5>';

                        if (comic.description != null) {
                            output += '<p style="font-size: 12px;" class="card-text">' +
                                comic.description +
                                '</p>';
                        }


                        output += '<p style="font-size: 12px;" class="card-text text-muted">Characters: ';

                        for (const k in comic.characters.items) {
                            if (comic.characters.items.hasOwnProperty(k)) {
                                const character = comic.characters.items[k];
                                output += character.name.concat(', ');
                            }
                        }

                        output += '</p>';
                        output += '<p style="font-size: 12px;" class="card-text text-muted">Creators: ';

                        for (const j in comic.creators.items) {
                            if (comic.creators.items.hasOwnProperty(j)) {
                                const creator = comic.creators.items[j];

                                output += creator.name
                                    .concat(' (' + creator.role + '), ');

                            }
                        }

                        output += '</p>';
                        output += '</div>' +
                            '<div class="card-footer">' +
                            '<small style="line-height: 1;" class="text-muted">' + results["attributionText"] + '</small>' +
                            '</div>' +
                            '</div>';
                    }
                }

                output += '</div>';

                comicSection.innerHTML = output;
            }


        } else {
            console.log('Error onload function.');
        }
    }

    xhr.onerror = function () {
        console.log('Error onerror function.');
    }

    xhr.send();
}

function singleComic() {
    var urlQueryParameters = new URLSearchParams(window.location.search),
        comicID = urlQueryParameters.get('comic-id');

    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/connections/single-comic.php?comic-id=' + comicID, true);
    xhr.onload = function() {
        if (this.status == 200) {
            var results = JSON.parse(this.responseText);
                comicInfo = results["data"].results[0],
                comicImage = comicInfo.thumbnail["path"] + '.' + comicInfo.thumbnail["extension"],
                comicDescription = comicInfo.description,
                comicCharacters = comicInfo.characters.items,
                comicCreators = comicInfo.creators.items,
                output = '',
                singleComicContainerDiv = document.getElementById('singleComicContainerDiv');
            
            output += '<h1 class="header-main-title single-comic__main-title">' + comicInfo.title + '</h1>' +
            '<div class="card mb-3">' +
                '<div class="row no-gutters">' +
                    '<div class="col-md-4">' +
                        '<img src="' + comicImage + '" class="card-img" alt="...">' +
                    '</div>' +
                    '<div class="col-md-8">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title">' + comicInfo.title + '</h5>' +
                            '<p class="card-text">' + comicDescription + '</p>'+
                            '<p class="card-text">'+
                                '<small class="text-muted">' +
                                ' Characters: ';
                                for (const i in comicCharacters) {
                                    if (comicCharacters.hasOwnProperty(i)) {
                                        const character = comicCharacters[i];
                                        output += '<a href="#">' + character.name + '</a>, ';
                                    }
                                }
                                
            output +=           '</small>' +
                            '</p>' +
                            '<p class="card-text">' +
                                '<small class="text-muted">' +
                                'Creators: ';
                                for (const i in comicCreators) {
                                    if (comicCreators.hasOwnProperty(i)) {
                                        const creator = comicCreators[i];
                                        output+= '<a href="#">' + creator.name + '</a>, ';
                                    }
                                }
                            
            output +=            '</small>' +
                            '</p>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="card-footer text-muted text-right"> ' +
                    results["attributionText"] +
                '</div>' +
            '</div>';

            singleComicContainerDiv.innerHTML = output;
        }
        else {
            console.log('Error from onload Function...');
        }
    }
    xhr.onerror = function() {
        console.log('Error from onerror function...');
    }
    xhr.send();
}