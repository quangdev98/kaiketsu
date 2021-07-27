$(document).ready(function(){

    // 
    $(".eye-show").hover(function(){
        $(this).siblings('input.form-control').attr('type', function(index, attr){
            return attr == 'password' ? 'text' : 'password';
        });
        $(this).toggleClass('active');
    })

    // 
    function setMargin(){
        let widthMenu = $("nav.nav-menu").outerWidth();
        $(".wrap-main").css({"margin-left": widthMenu + "px"});
    }
    setMargin();
    // 
    function readURL(input) {
        if (input.files && input.files[0]) {
            var url = URL.createObjectURL(event.target.files[0]);
            $(input).parents(".drop-file").find('span.invalid-feedback').text('');
            $(input).parents(".drop-file").find('div.preview').show();
            $(input).parents(".drop-file").find('div.preview').attr("style", "background: #F2F2F2 url('" + url + "') no-repeat top center; background-size: contain; display: block; background-position: center");
            $(input).parents(".drop-file").find('div.fill').addClass('active');
            $(input).parents(".drop-file").find('.b-drop').addClass('active');
        }
    }
    $("#file").change(function() {
        readURL(this);
      });
      $("#file_2").change(function() {
        readURL(this);
      });
    // 
    $(window).resize(function () {
        setMargin();
    });

    // 
    function deleteQuestion(){
        $('.close-input-auto').click(function(){
            $(this).parents('.box-item-input').css('display','none');
            $(this).parents('.box-item-input').html('');
        })
    }
    deleteQuestion();
    $('#add-input').click(function(){
        $('#table-input-auto').append(`
        <div class="box-item-input">
        <div class="item-add"><input type="text" placeholder="鈴木のお菓子教室" value="鈴木のお菓子教室" class="form-control"></div>
        <div class="item-even"><input type="checkbox"></div>
        <div class="item-add"><select name="" id="" class="form-control">
            <option value="">配信希望,配信希望!!</option>
        </select></div>
        <div class="item-add"><input type="text" placeholder="入団しない" value="入団しない" class="form-control"></div>
        <div class="item-add"><button type="button" class="btn">削除ボタン</button></div>
    </div>`);
        deleteQuestion();
    });
});