// DROPDOWN

$(document).ready(function () {
    $('.drop-btn .lesson-data h2 button').click(function () {
        $(this).toggleClass('active');
        $(this).parent().parent().parent().parent().find('.drop-btn').toggleClass('active');
        $(this).closest('.assessment-result').find('.drop-list').first().slideToggle('fast');
        event.stopPropagation();
    });
});

$(document).ready(function () {
    $('.lessons-btn').click(function () {
        $(this).toggleClass('active');
        $('.lessons-list').slideToggle('fast');
        event.stopPropagation();
    });
});

// DROPDOWN

// TOGGLE SIDEBAR

const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
})

// TOGGLE SIDEBAR



