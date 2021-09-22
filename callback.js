 function frndOne(frnd, callback) {
    console.log(`i m busy to talkwith my frnd ${frnd}`);
    callback();
}

 function frndTwo()  {
    console.log(`hi tell me`);
}

frndOne("sankar", frndTwo);