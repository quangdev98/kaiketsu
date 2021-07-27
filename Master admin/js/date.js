
        yearOld = '';
        monthOld = '';
        dayOld = '';
        if(yearOld !== '') yearOld = parseInt(yearOld);
        if(monthOld !== '') monthOld = parseInt(monthOld);
        if(dayOld !== '') dayOld = parseInt(dayOld);

        var s,
            DateWidget = {
                settings: {
                    months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],//[" 一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    months_number: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    currDay: new Date().getUTCDate(),
                    currMonth: new Date().getUTCMonth(),
                    currYear: new Date().getUTCFullYear(),
                    yearOffset: $(".dateDropdown").data('year'),
                    containers: $(".dateDropdown")
                },

                init: function () {
                    s = this.settings;
                    DW = this;
                    s.containers.each(function () {
                        DW.removeFallback(this);
                        DW.createSelects(this);
                        DW.populateSelects(this);
                        DW.initializeSelects(this);
                        DW.bindUIActions(this);
                    })
                },

                getDaysInMonth: function (month, year) {
                    return new Date(year, month, 0).getDate();
                },

                addYears: function (yearSelect) {
                    if(yearOld === '') {
                        $("<option />")
                            .text('年')
                            .val('')
                            .appendTo(yearSelect);
                    }
                    for (var i = 0; i < s.yearOffset; i++) {
                        $("<option />")
                            .text(s.currYear - i)
                            .val(s.currYear - i)
                            .appendTo(yearSelect);
                    }
                },
                addMonths: function (monthSelect) {
                    if(monthOld === '') {
                        $("<option />")
                            .text('月')
                            .val('')
                            .appendTo(monthSelect);
                    }
                    for (var i = 0; i < 12; i++) {
                        $("<option />")
                            .text(s.months[i])
                            .val(s.months[i])
                            .appendTo(monthSelect);
                    }
                },

                addDays: function (daySelect, numDays) {
                    $(daySelect).empty();
                    $("<option />")
                        .text('日')
                        .val('')
                        .appendTo(daySelect);

                    for (var i = 0; i < numDays; i++) {
                        $("<option />")
                            .text(i + 1)
                            .val(i + 1)
                            .appendTo(daySelect);
                    }
                },



                removeFallback: function (container) {
                    $(container).empty();
                },

                createSelects: function (container) {
                    $("<select id='year_" + container.dataset.id + "' class='year form-control '>").appendTo(container);
                    $("<select id='month_" + container.dataset.id + "' class='month form-control '>").appendTo(container);
                    $("<select id='day_" + container.dataset.id + "' class='day form-control '>").appendTo(container);
                },

                populateSelects: function (container) {
                    DW.addDays($(container).find('.day'), DW.getDaysInMonth(s.currMonth, s.currYear));
                    DW.addMonths($(container).find('.month'));
                    DW.addYears($(container).find('.year'));
                },

                initializeSelects: function (container) {
                    $(container).find('#day_' + container.dataset.id).val(dayOld);
                    $(container).find('#month_' + container.dataset.id).val(monthOld);
                    $(container).find('#year_' + container.dataset.id).val(yearOld);
                },

                bindUIActions: function (container) {
                    $(".month").on("change", function () {
                        var daySelect = $(this).prev(),
                            yearSelect = $(this).next(),
                            month = s.months.indexOf($(this).val()) + 1,
                            days = DW.getDaysInMonth(month, yearSelect.val());
                        DW.addDays(daySelect, days);
                    });

                    $(".year").on("change", function () {
                        var daySelect = $(this).prev().prev(),
                            monthSelect = $(this).prev(),
                            month = s.months.indexOf(monthSelect.val()) + 1,
                            days = DW.getDaysInMonth(month, $(this).val());
                        DW.addDays(daySelect, days);
                    });

                    $(".day").on("change", function () {
                        var yearVal = $('#year_' + container.dataset.id).val();
                        var monthVal = $('#month_' + container.dataset.id).val();
                        var dayVal = $('#day_' + container.dataset.id).val();
                        var dateVal = yearVal + '/' + monthVal + '/' + dayVal;
                        if (yearVal !== '' && monthVal !== '' && dayVal !== '') {
                            $('input[name=' + container.dataset.input + ']').val(dateVal);
                            $('#' + container.dataset.input + '-error').remove();
                        }
                    });
                }
            };

        DateWidget.init();
