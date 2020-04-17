$.getJSON("https://redcap.ctsi.ufl.edu/redcap/api/?type=module&prefix=redcap_webservices&page=plugins%2Fendpoint&NOAUTH&query_id=PKY_grade_availability&project_id=8338", function(data) {
    let tbl_body = "";
    let i = 0;
    tbl_body += "<thead><tr>";

    // add any non-present grades
    let grades = [...Array(13).keys()];
    grades.forEach(function(grade) {
        r = data.data.find(element =>
            element.grade == grade
        );
        if (r === undefined) {
            data.data.push({"grade" : grade.toString(), "available" : "85"});
        }
    });

    // sort the added grades
    data.data.sort(function(a, b) {
        if (parseInt(a.grade) < parseInt(b.grade)) {
            return -1;
        } else if (parseInt(b.grade) < parseInt(a.grade)) {
            return 1;
        }
    });

    // dynamically set table header columns based on JSON keys
    let header_titles = data.data[0];
    $.each(header_titles, function(k, v) {
        tbl_body += `<th class='text-center'>${mapHeaderNames(k)}</th>`;
    });
    tbl_body += "</tr></thead>";
    tbl_body += "<tbody>";

    // dynamically populate table rows
    $.each(data.data, function() {
        let tbl_row = "";
        let row_color = "";
        $.each(this, function(k , v) {
            if (k == 'available' && v == 0) {
                row_color = "style='color: orange'";
            }
            v = mapNames(k, v);
            tbl_row += "<td>"+v+"</td>";
        });
        tbl_body += `<tr ${row_color}>${tbl_row}</tr>`;
    });

    tbl_body += "</tbody>";
    $("#appointment_table").html(tbl_body);
});

function mapHeaderNames(k) {
    return (k in header_names_map ? header_names_map[k] : k);
}

header_names_map = {
    'grade': 'Grade',
    'available': 'Available Spots'
};

function mapNames(k, v) {
    switch(k) {
        case "grade":
            v = ( v == '0' ? 'K' : v);
            break;
    }
    return v;
}
