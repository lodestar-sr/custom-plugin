var myEditor = {};
var user = { id: "wh", name: "Wael Hallag" };
$(function () {
    initEditor({ selector: "#editor", releaseID: 619945, language: "en", withCollboration: true, user: user }).then(editor => {
        console.info();
        myEditor = editor;
    });
});

async function initEditor(parameters = { selector, releaseID, language, withCollboration, user}) {
    let initialData = undefined;
    // if (parameters.withCollboration == undefined) { parameters.withCollboration = false;}
    // if (parameters.releaseID == undefined || parameters.language == undefined) {
    //     console.log("You need to send release ID and language");
    //     return;
    // }
    //
    // if (localStorage.getItem("client_token") == undefined && parameters.withCollboration == true) {
    //     console.log("Token is required to use collaboration");
    //     return;
    // }

    // let res = await (await fetch(`${net3000.common.apiURL()}release?id=${parameters.releaseID}`)).json();
    // if (res.code == 302) {
    //     initialData = res.data.body;
    // } else {
    initialData = $("#testData").html();
    // }

    let config = {
        toolbar: [
            'undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'underline', 'subscript', 'superscript', 'removeFormat', '|',
            'link', '|', 'indent', 'outdent', '|', 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify', '|',
            'bulletedList', 'numberedList', '|', 'imageInsert', 'insertImage', 'mediaEmbed', '|', 'fullscreen', '|',
            'pageBreak', '|', 'specialCharacters', '|', 'insertTable', '|', 'tableUnderline', 'cft', 'clearContent'
        ],
        language: 'en',
        image: {
            toolbar: [
                'imageTextAlternative',
                'imageStyle:full',
                'imageStyle:side',
                'linkImage',
                'comment'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableCellProperties',
                'tableProperties'
            ],
            tableToolbar: ['comment']
        },
        ckfinder: {
            // Upload the images to the server using the CKFinder QuickUpload command.
            uploadUrl: 'upload_image_url',
            options: {
                resourceType: 'Images'
            },
        },
        mediaEmbed: {
            previewsInData: true
        }
    };

    // if (parameters.withCollboration == false) {
        config.removePlugins = ['RealTimeCollaborativeEditing', 'RealTimeCollaborativeComments', 'RealTimeCollaborativeTrackChanges', 'PresenceList'];
    // } else {
    //     let token = await (await fetch("https://alpha.accesswire.com/ckeditorToken/", {
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("client_token")
    //         }
    //     })).text();
    //     //token: "https://73176.cke-cs.com/token/dev/909c4490abfa76dded8c5ca679ed8ed85eb9c423a1c6fa9ee796257d8ce9"
    //     console.log(token);
    //
    //     config.initialData = initialData;
    //     config.cloudServices = {
    //         uploadUrl: "https://73176.cke-cs.com/easyimage/upload/",
    //         webSocketUrl: "wss://73176.cke-cs.com/ws/"
    //     };
    //     config.cloudServices.tokenUrl = token;
    //     config.toolbar = config.toolbar.concat(['|', 'comment', '|', 'trackChanges']);
    //     config.collaboration = {
    //         channelId: `${parameters.releaseID}-${parameters.language}`
    //     };
    //     config.sidebar = {
    //         container: document.querySelector('.sidebar')
    //     }
    //     config.presenceList = {
    //         container: document.querySelector('.presence')
    //     }
    // }
    let editor = await ClassicEditor.create(document.querySelector(parameters.selector), config);
    //editor.data.processor = new ClassicEditor.CustomDataProcessor();

    // if (parameters.withCollboration == false) {
        //editor.setData(initialData);
    // } else {
    //     editor.execute('trackChanges');
    //     if (parameters.user != undefined) {
    //         const userPlugin = editor.plugins.get('Users');
    //         //userPlugin.addUser(parameters.user);
    //         //userPlugin.defineMe(parameters.user.id);
    //         //console.log(userPlugin.users);
    //         editor.plugins.get('Annotations').switchTo('inline');
    //     }
    // }
    return editor;
}
