let RowData = [];
let Row = [];
let savedHeader = "";
let resName = GetParentResourceName();

function CloseInput() {
    $(`.main-wrapper`).fadeOut(0);
    $(`.background`).fadeOut(0);
    $(savedHeader).remove();
    $(Row).remove();
    
    RowData = [];
    Row = [];
    savedHeader = "";
};

$(`#confirm`).click(() => {
    SubmitData();
})

$(`#cancel`).click(() => {
    CloseInput();

    $.post(`https://${resName}/close`);
})

const OpenInput = (data) => {
    $(`.main-wrapper`).fadeIn(0)
    $(`.background`).fadeIn(0)
    SetHeader(data)
    AddTextBox()
}

const SetHeader = (header) => {
    let element = $('<h1>' + header + '<h1>');
    $('.header').append(element);
    savedHeader = element
}

const AddTextBox = (data) => {
    RowData = data
    let element = $('<input type="text" class="form-control" id="0"/>');
    $('.body').append(element);

    Row = element;
};

const SubmitData = () => {
    const returnData = [];
    let data = document.getElementById(0)

    if (data.value) {
        returnData.push({
            input: data.value,
        });
    } else {
        returnData.push({
            input: null,
        });
    }

    $(Row).remove();

    $.post(`https://${resName}/postData`, JSON.stringify({data: returnData}));
    CloseInput();
}

window.addEventListener("message", (evt) => {
    const data = evt.data
    const info = data.data
    const action = data.action
    
    switch (action) {
        case "show_input":
            return OpenInput(info);
        default:
            return;
    }
})

window.addEventListener("keyup", (ev) => {
    if (ev.which == 27) {
        $.post(`https://${resName}/close`);
        CloseInput();
    } else if (ev.which == 13) {
        SubmitData()
    }
})