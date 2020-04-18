document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();

    $("select[required]").css({ position: 'absolute', display: 'inline', height: 0, padding: 0, width: 0 });

    ClassicEditor
        .create(document.querySelector('#editor'), {
            removePlugins: ['Image', 'EasyImage', 'ImageUpload', 'Link', 'MediaEmbed', 'Heading']
        })
        .then(editor => {
            newEditor = editor;
        })
        .catch(error => {
            console.error(error);
        });

    function addTags(arrayLength, array) {

        for (i = 0; i < arrayLength; i++) {
            $("#create-story").append(`<input type="hidden" name="tags" value="${array[i].tag}">`);
        }
        return true
    }


    $("#create-story").on('submit', function (event) {
        var tagDict = M.Chips.getInstance($('.chips')).chipsData
        var tagDictLength = Object.keys((M.Chips.getInstance($('.chips')).chipsData)).length
        var editorData = newEditor.getData().length;

        if (tagDictLength === 0 || editorData === 0) {
            event.preventDefault();
            alert('Please fill all fields');
            return false
        }

        else {
            addTags(tagDictLength, tagDict)
        }
    });
});

function initTags(tagCreate) {
    document.addEventListener('DOMContentLoaded', function () {
        var chips = document.querySelectorAll('.chips');

        var instances = M.Chips.init(chips, {
            limit: 15,
            placeholder: 'Tags (Press Enter)',
            secondaryPlaceholder: '+Tag',
            autocompleteOptions: {
                data: tagCreate,
                limit: 8,
            }
        });
    });
}