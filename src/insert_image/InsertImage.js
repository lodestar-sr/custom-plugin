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
                fetch('http://localhost:3000/client/assetManager/categories', {
                    method: 'get'
                }).then(response => {
                    let selectedImage = '';
                    let selectedCat = 'all';
                    let _this = this;
                    if (response.status === 200) {

                        let html = '';
                        let titles =  "<a class=\"dropdown-item filter-item\" href=\"#\" data-value='all'>Show all</a>\n";
                        response.json().then(res => {
                            console.log(res.data);
                            console.log(res.data[0].title);
                            for (let i = 0; i < res.data.length; i++) {
                                let cat = "cat"+i;
                                titles += "<a class=\"dropdown-item filter-item\" href=\"#\" data-value="+cat+">"+ res.data[i].title +"</a>\n";
                                for (let j = 0; j < res.data[i].assets.length; j++) {
                                html += "   <div class=\"col-lg-3 col-md-4 col-xs-6 thumb cat "+ " " +cat+" \">" +
                                    "           <a class='add-image' data-path='" + res.data[i].assets[j].url + "' href='#'> \n" +
                                    "            <img class=\"img-thumbnail\" src='" + res.data[i].assets[j].url + "' alt='" + res.data[i].assets[j].title + "'> \n" +
                                    "          </a>\n" +
                                    "        </div>\n";
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
                $('body').append("<div class=\"modal\" id='myModal' tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModal\" aria-hidden=\"true\">\n" +
                    "  <div class=\"modal-dialog\" role=\"document\">\n" +
                    "    <div class=\"modal-content\">\n" +
                    "      <div class=\"modal-header\">\n" +
                    "        <h5 class=\"modal-title\">Select Image</h5>\n" +
                    "        <button type=\"button\" class=\"close\" id='cancle' data-dismiss=\"modal\" aria-label=\"Close\">\n" +
                    "          <span aria-hidden=\"true\">&times;</span>\n" +
                    "        </button>\n" +
                    "      </div>\n" +
                    "   <div class=\"modal-body\">\n" +
                    "    <div class=\"row\">\n" +
                    "      <div class=\"col-lg-12\">\n" +
                    "    <div class=\"row\">\n" +
                    "        <div class=\"col-lg-6 col-md-6 col-xs-6 \">\n" +
                    "             <div class=\"selected-block\" >\n" +
                    "                   <img class=\"img-selected\" src=\"http://upload.wikimedia.org/wikipedia/commons/7/78/1997_Fiat_Panda.JPG\" alt=\"Another alt text\"> \n" +
                    "             </div> \n" +
                    "        </div>\n" +
                    "        <div class=\"col-lg-6 col-md-6 col-xs-6 thumb \">\n" +
                    "     <div class=\"btn-group\">\n" +
                    "  <button type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
                    "    Show all    \n" +
                    "  </button>\n" +
                    "  <div id='title' class=\"dropdown-menu\">\n" +
                    "    <a class=\"dropdown-item\" href=\"#\">Geographics</a>\n" +
                    "    <a class=\"dropdown-item\" href=\"#\">Faishonable</a>\n" +
                    "    <div class=\"dropdown-divider\"></div>\n" +
                    "    <a class=\"dropdown-item\" href=\"#\">Others</a>\n" +
                    "  </div>\n" +
                    "</div>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "    <div id='content' class=\"row\">\n" +
                    "        <div class=\"col-lg-3 col-md-4 col-xs-6 thumb \">" +
                    "           <a  href=\"#\"> \n" +
                    "            <img class=\"img-thumbnail\" src=\"http://upload.wikimedia.org/wikipedia/commons/7/78/1997_Fiat_Panda.JPG\" alt=\"Another alt text\"> \n" +
                    "          </a>\n" +
                    "        </div>\n" +
                    "     </div>\n" +
                    "   </div>\n" +
                    "   </div>\n" +
                    "      </div>\n" +
                    "      <div class=\"modal-footer\">\n" +
                    "        <button type=\"button\" id='cancle'  class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n" +
                    "        <button type=\"button\" id='hide' class=\"btn btn-primary\">Add to Editor</button>\n" +
                    "      </div>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "</div>")
                $('#myModal').show();
                $('body').addClass('modal-open');
                $("#cancle").click(function(){$('#myModal').hide();$('body').removeClass('modal-open');});

                $("#content").on("click", ".add-image", function(e){
                    $('.selected-block').html('<img class="img-selected" src="'+$(this).data('path')+'" alt="Another alt text">');
                    _this.selectedImage = $(this).data('path');
                });
                $(".modal-body").on("click", ".filter-item", function(e){
                    let x = $(this).data('value');
                    $('.cat').hide();
                    $('.'+x).show();
                    _this.selectedCat = x;
                    if(x == 'all')
                        $('.cat').show();
                });

                $("#hide").click(function(){
                    editor.model.change( writer => {
                        const imageElement = writer.createElement( 'image', {
                            src: _this.selectedImage
                        } );
                    editor.model.insertContent( imageElement, editor.model.document.selection );
                    } );
                    $('#myModal').hide();
                    $('body').removeClass('modal-open');
                })
            } );
            return view;
        } );
    }
}
