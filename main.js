var characterID = 0;

function characters() {
    document.getElementById("characterCard").style.borderStyle = "hidden";

    document.getElementById('connectionForm')
        .addEventListener('submit', connection);

    function connection(e) {
        e.preventDefault();

        var xhr = new XMLHttpRequest();
        var name = document.getElementById('name').value;
        var params = "name=" + name;

        xhr.open('GET', 'connection.php?' + params, true);

        xhr.onload = function () {
            if (this.status == 200) {
                var results = JSON.parse(this.responseText);
                var characterSection = document.getElementById('characterSection');

                if (results["data"].count === 0) {
                    document.getElementById("characterCard").style.borderStyle = "hidden";

                    document.getElementById('characterImage')
                        .innerHTML = '';

                    document.getElementById('characterName')
                        .innerHTML = 'No results for... ' + name;

                    document.getElementById('characterDescription')
                        .innerText = '';

                    document.getElementById("comicsAvailable")
                        .innerText = '';

                    document.getElementById('characterInfoAttribution')
                        .innerText = '';

                    document.getElementById('comicSection').innerHTML = '';
                } else {
                    document.getElementById("characterCard").style.borderStyle = "solid";

                    var characterAttributes = results["data"].results[0];
                    characterID = results["data"].results[0].id;
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
// if (window.location.pathname === '/' || 
//     window.location.pathname === '/index.php') {

// } 

function comics(characterID) {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'connection.php?character-id=' + characterID, true);

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
                            '<img src="' + comic.thumbnail["path"] +
                            '.' + comic.thumbnail["extension"] +
                            '" class="card-img-top" alt="' + comic.title + '">' +
                            '<div class="card-body">' +
                            '<h5 class="card-title">' + comic.title + '</h5>';

                        if (comic.description != null) {
                            output += '<p style="font-size: 12px;" class="card-text text-muted">' +
                                comic.description +
                                '</p>';
                        }


                        output += '<p style="font-size: 12px;" class="card-text">Characters: ';

                        for (const k in comic.characters.items) {
                            if (comic.characters.items.hasOwnProperty(k)) {
                                const character = comic.characters.items[k];
                                output += character.name.concat(', ');
                            }
                        }

                        output += '</p>';
                        output += '<p style="font-size: 12px;" class="card-text">Creators: ';

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