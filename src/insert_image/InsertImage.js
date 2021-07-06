import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import $ from "jquery";

import 'sweetalert2/dist/sweetalert2.css';


export default class InsertImage extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'insertImage', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Insert image',
                icon: imageIcon,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                fetch(editor.config._config.insertImagesUrl, {
                    method: 'get'
                }).then(response => {
                    let selectedImage = '';
                    let selectedCat = 'all';
                    if (response.status === 200) {

                        let html = '';
                        let titles =  "<a class=\"dropdown-item filter-item\" href=\"#\" data-value='all'>Show all</a>\n";
                        response.json().then(res => {
                            for (let i = 0; i < res.data.length; i++) {
                                let cat = "cat"+i;
                                titles += "<a class=\"dropdown-item filter-item\" href=\"#\" data-value="+cat+">"+ res.data[i].title +"</a>\n";
                                for (let j = 0; j < res.data[i].assets.length; j++) {
                                html += "<div class=\"col-lg-3 col-md-4 col-xs-6 thumb cat "+ " " +cat+" \">" +
                                    "    <a class='add-image' data-path='" + res.data[i].assets[j].url + "' href='#'> \n" +
                                    "        <img class=\"img-thumbnail\" src='" + res.data[i].assets[j].url + "' alt='" + res.data[i].assets[j].title + "'> \n" +
                                    "    </a>\n" +
                                    "    </div>\n";
                                }
                            }
                            $('#title').html(titles);
                            $('#content').html(html);
                        });
                    } else {
                        console.warn("Error:" + response.status);
                    }
                }).catch(err => {
                    console.log(err);
                });
                $('body').append("<div class=\"modal\" id='insertimageModel' tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"insertimageModel\" aria-hidden=\"true\">\n" +
                    "<div class=\"modal-dialog\" role=\"document\">\n" +
                    "   <div class=\"modal-content\">\n" +
                    "     <div class=\"modal-header\">\n" +
                    "        <h5 class=\"modal-title\">Select Image</h5>\n" +
                    "        <button type=\"button\" class=\"close\" id='cancle' data-dismiss=\"modal\" aria-label=\"Close\">\n" +
                    "          <span aria-hidden=\"true\">&times;</span>\n" +
                    "        </button>\n" +
                    "      </div>\n" +
                    "    <div class=\"modal-body\">\n" +
                    "    <div class=\"row\">\n" +
                    "      <div class=\"col-lg-12\">\n" +
                    "        <div class=\"row\">\n" +
                    "          <div class=\"col-lg-6 col-md-6 col-xs-6 \">\n" +
                    "             <div class=\"selected-block\" >\n" +
                    "                   <span>Image Preview</span> \n" +
                    "             </div> \n" +
                    "          </div>\n" +
                    "        <div class=\"col-lg-6 col-md-6 col-xs-6 thumb \">\n" +
                    "          <div class=\"btn-group\">\n" +
                    "          <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
                    "              Show all    \n" +
                    "          </button>\n" +
                    "          <div id='title' class=\"dropdown-menu\">\n" +
                    "             <a class=\"dropdown-item\" href=\"#\">Category 1</a>\n" +
                    "             <a class=\"dropdown-item\" href=\"#\">Category 2</a>\n" +
                    "             <a class=\"dropdown-item\" href=\"#\">Category 3</a>\n" +
                    "          </div>\n" +
                    "         </div>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "    <div id='content' class=\"row\">\n" +
                    "        <div class=\"col-lg-12 col-md-12 col-xs-12 \">" +
                    "           <p class=\"no-image\">No Images Found</p>\n" +
                    "        </div>\n" +
                    "     </div>\n" +
                    "   </div>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "<div class=\"modal-footer\">\n" +
                    "     <button type=\"button\" id='cancle2'  class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n" +
                    "        <button type=\"button\" id='hide' class=\"btn btn-primary\" disabled>Add to Editor</button>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</div>")
                $('#insertimageModel').show();
                $('body').addClass('modal-open');
                $("#cancle,#cancle2").click(function(){$('#insertimageModel').hide();$('body').removeClass('modal-open');});
                let _this = this;
                $("#content").on("click", ".add-image", function(e){
                    $('.selected-block').html('<img class="img-selected" src="'+$(this).data('path')+'" alt="Another alt text">');
                    _this.selectedImage = $(this).data('path');
                    console.log(_this.selectedImage);
                    $('#hide').prop('disabled', false);
                });
                $(".modal-body").on("click", ".filter-item", function(e){
                    let x = $(this).data('value');
                    $('.cat').hide();
                    $('.'+x).show();
                    if(x == 'all')
                        $('.cat').show();
                    $(this).parents(".btn-group").find('.btn').html($(this).text() + ' <span class="caret"></span>');
                    $(this).parents(".btn-group").find('.btn').val(x);
                });

                $("#hide").click(function(){
                    editor.model.change( writer => {
                        const imageElement = writer.createElement( 'image', {
                            src: _this.selectedImage
                        } );
                    editor.model.insertContent( imageElement, editor.model.document.selection );
                    } );
                    $('#insertimageModel').hide();
                    $('body').removeClass('modal-open');
                })
            } );
            return view;
        } );
    }
}
