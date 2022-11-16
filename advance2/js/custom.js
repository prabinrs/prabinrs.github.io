// $(document).ready(function () {

//     $("#btnConvert").on('click', function () {
//     html2canvas(document.getElementById("html-content-holder"), {
//         allowTaint: true,
//         useCORS: true
//     }).then(function (canvas) {
//         var anchorTag = document.createElement("a");
//         document.body.appendChild(anchorTag);
//         document.getElementById("previewImg").appendChild(canvas);
//         anchorTag.download = "filename.jpg";
//         anchorTag.href = canvas.toDataURL();
//         anchorTag.target = '_blank';
//         anchorTag.click();
//     });
//     });


//     const actualBtn = document.getElementById('upload');

//     const fileChosen = document.getElementById('file-chosen');

//     actualBtn.addEventListener('change', function () {
//     fileChosen.textContent = this.files[0].name
//     })
// });

$(document).ready(function($) {
    $('#btnConvert').on('click',function() {
        let csv = $('#upload');
        let csvFile = csv[0].files[0];
        let ext = csv.val().split(".").pop().toLowerCase();
        if($.inArray(ext, ["csv"]) === -1){
            alert('upload csv');
            return false;
        }
        if(csvFile != undefined) {
            reader = new FileReader();
            reader.onload = function(e){
                const csvResult = e.target.result.split(/\r|\n|\r\n/),
                csv_array = e.target.result.split('\r\n');
                let html_csv = '';
                for (let i = 0; i < csv_array.length; i++) {
                    let csv_split = csv_array[i].split(',');
                    for (let j = 0; j < csv_split.length; j++) {
                            if (j==1) {
                                html_csv +=`
                                    <div class="content-block block-${i}">
                                        <div class="d-flex">
                                            <div class="color-circle">
                                                <span style="background: #${csv_split[j]}"></span>
                                            </div>`;
                            }
                            if (j==2) {
                                html_csv +=`
                                            <div class="item-desc">
                                                ${csv_split[j]}
                                            </div>
                                        </div>
                                    </div>`;
                            }
                        }
                    }
                $('.printable-area').html('');
                $('.printable-area').append(html_csv);
            }
            reader.readAsText(csvFile);
        }
    });

    $("#btn-download").on('click', function () {
        debugger;
        let indx = 0, x = 0;
        $('#printable-area').children().each(function (index) {
            let make_class = `.block-${indx}`;
            let section = document.querySelector(make_class);
            indx++;
            html2canvas(section).then(canvas => {
                let link = document.createElement('a');
                link.href = canvas.toDataURL();
                link.download =  `${++x}.png`;
                document.body.appendChild(link);
                link.click();
            });
        });
    })
});
