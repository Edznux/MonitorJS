function b_green() {    $('#b_green').show();    $('#b_orange').hide();    $('#b_red').hide();    mp_menu = document.getElementsByClassName('mp_menu');    mp_menu[0].className = 'mp_menu' + ' active';    mp_menu[1].className = 'mp_menu';    mp_menu[2].className = 'mp_menu';}function b_orange() {    $('#b_green').hide();    $('#b_orange').show();    $('#b_red').hide();    mp_menu = document.getElementsByClassName('mp_menu');    mp_menu[0].className = 'mp_menu';    mp_menu[1].className = 'mp_menu' + ' active';    mp_menu[2].className = 'mp_menu';}function b_red() {    $('#b_green').hide();    $('#b_orange').hide();    $('#b_red').show();    mp_menu = document.getElementsByClassName('mp_menu');    mp_menu[0].className = 'mp_menu';    mp_menu[1].className = 'mp_menu';    mp_menu[2].className = 'mp_menu' + ' active';}function fermer() {	$('#b_green').hide();    $('#b_orange').hide();    $('#b_red').hide();    mp_menu = document.getElementsByClassName('mp_menu');    mp_menu[0].className = 'mp_menu';    mp_menu[1].className = 'mp_menu';    mp_menu[2].className = 'mp_menu';}