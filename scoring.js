// DOMの読み込みが終わったらfunction()の中の処理を実行します。
$(document).ready(function(){

    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]の入力値を取得して合計点と平均点を出すロジックを作ります。
    function score_indicate(){
        // 変数「subject_points」に
        // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]の配列を代入します。
        /*        
        let subject_points = [Number($('#national_language').val()),
                              Number($('#english').val()),
                              Number($('#mathematics').val()),
                              Number($('#science').val()),
                              Number($('#society').val())
                             ];
        */
        // 変数「sum」に
        // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]をそれぞれ足します。
        // ヒント! 配列を一つずつ取り出して足していきます。
        /*        
        let sum = subject_points[0]; 
        sum = sum + subject_points[1];
        sum = sum + subject_points[2];
        sum = sum + subject_points[3];
        sum = sum + subject_points[4];
        */        

        var subject_points = [];
        var sum=0;        
        SUBJECT_ID_DEF.forEach(elem => {
            let point = Number($(elem).val());
            sum += point;
            subject_points.push(point);
        });        

        // 「合計点：」(id="sum_indicate")に変数「sum」(合計点)を出力させます。
        $("#sum_indicate").text(sum);

        // 変数「average」に
        // 平均値を出して代入します。(平均をとりたい数の合計点数(sum) / 全体の個数)
        // ヒント! 全体の個数はlengthメソッドを使って求めます。(lengthメソッド: 文字列の長さや配列の要素数などを取得するメソッド)
        var average = sum/subject_points.length;
        $("#average_indicate").text(average);
        

    };

    // 平均点数を取得し、取得した平均点数からランク分け("A", "B", "C", "D")をするロジックを作ります。
    function get_achievement(){
        // 変数「averageIndicate」に
        // 平均点数をHTML上のid="average_indicate"から取得して代入します。
        var averageIndicate = $("#average_indicate").text();
        console.log(averageIndicate)

        // もし「averageIndicate」が80以上なら"A"を返します。
        if ( averageIndicate >= 80){
            return "A";
            // もし「averageIndicate」が60以上なら"B"を返します。
        } else if ( averageIndicate >= 60) {
            return "B";
            // もし「averageIndicate」が40以上なら"C"を返します。
        } else if ( averageIndicate >= 60) {
            return "C";
            // もし「averageIndicate」がそれ以外の点数なら"D"を返します。            
        } else {
            return "D";
        }
    };

    // 各教科の点数を取得し、取得した点数から合格/不合格の判断を下すロジックを作ります。
    function get_pass_or_failure(){
        /*            
        let subject_points = [Number($('#national_language').val()),
                              Number($('#english').val()),
                              Number($('#mathematics').val()),
                              Number($('#science').val()),
                              Number($('#society').val())
                             ];
        */        
        var subject_points = [];        
        SUBJECT_ID_DEF.forEach(elem => {
            subject_points.push(Number($(elem).val()));            
        });

        // 変数「number」に入力した教科の数を代入します。
        var number = subject_points.length;

        // 変数「judge」に"合格"を代入しておきます。
        var judge = "合格";
        // 入力したそれぞれの教科の点数が60点よりも低いと変数「judge」に"不合格"を再代入して「judge」を返します。
        // ヒント! 「javascript 点数 合格 不合格 ロジック」で検索してみてください。
        for(let i=0; i<subject_points.length; i++){
            if(subject_points[i] < 60){
                judge = "不合格";
                break;
            }
        }
        
        return judge; //pass_or_failure;
    };

    // 最終的なジャッジのロジックを作ります。
    function judgement(){
        // 変数「achievement」に「get_achievement()の戻り値」を代入します。
        var achievement = get_achievement();

        // 変数「pass_or_failure」に「get_pass_or_failure()の戻り値」を代入します。
        var pass_or_failure = get_pass_or_failure();

        // 「最終ジャッジ」(id="alert-indicate)ボタンを押したら「あなたの成績は${achievement}で${pass_or_failure}です」が出力される処理です。
        $('#alert-indicate').remove();
        $('#declaration').append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${achievement}で${pass_or_failure}です</label>`);
    };

    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]のいずれかの点数が変更された際に「function score_indicate()」を発火させる処理です。
    $('#national_language, #english, #mathematics, #science, #society').change(function() {
        score_indicate();
    });

    // 「ランク」(id="evaluation")ボタンを押したら「get_achievement()」が出力される処理です。
    $('#btn-evaluation').click(function() {
        if(!is_input_collect()) {
            window.alert(MSG_INPUT_ERR);
            return;
        }
        $("#evaluation").text(get_achievement());
    });

    // 「判定」(id="btn-judge")ボタンを押したら「function et_pass_or_failure()」が出力される処理です。
    $('#btn-judge').click(function() {
        if(!is_input_collect()) {
            window.alert(MSG_INPUT_ERR);
            return;
        }
        $("#judge").text(get_pass_or_failure());
    });

    // 「最終ジャッジ」(id="btn-declaration")ボタンを押したら「function judgement()」が出力される処理です。
    $('#btn-declaration').click(function() {
        if(!is_input_collect()) {
            window.alert(MSG_INPUT_ERR);
            return;
        }        
        judgement();
    });

})
// ここに書かれているjsの記述はあくまでヒントとして用意された雛形なので、書かれている記述に従わずに実装したいという場合は、自分の好きに実装して構わない。課題要件を満たし、コードの品質が一定の水準にあると判定されればどのような実装でも合格になる。
// 例ではJavaScriptとjQueryの両方の記述を使用しているが、どちらかに統一しても構いません。

//入力チェック
function is_input_collect(){
    for (let elem of SUBJECT_ID_DEF) {
        let p = Number($(elem).val());
        if(p <0 || p>100) {
            return false;            
        }
    }
    return true;
}


//入力エラー箇所の背景色を変更
$('input').change(function(){
    var p = Number($(this).val());
    if(p <0 || p>100) {
        $(this).css('background-color', 'red');
    }
    else{
        $(this).css('background-color', 'transparent');        
    }
});

const SUBJECT_ID_DEF = ['#national_language', '#english', '#mathematics', '#science', '#society'];
const MSG_INPUT_ERR = '入力に誤りがあります';            
