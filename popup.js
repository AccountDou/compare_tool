// 这是处理文件上传和计算差异的JavaScript文件。
document.getElementById('compareButton').addEventListener('click', () => {
    const file1 = document.getElementById('file1').files[0];
    const file2 = document.getElementById('file2').files[0];

    if (!file1 || !file2) {
        alert('请上传两个文件');
        return;
    }

    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = () => {
        const content1 = reader1.result;
        reader2.onload = () => {
            const content2 = reader2.result;
            const result = compareFiles(content1, content2);
            document.getElementById('result').innerText = result;
        };
        reader2.readAsText(file2);
    };
    reader1.readAsText(file1);
});

function compareFiles(content1, content2) {
    const lines1 = content1.split('\n');
    const lines2 = content2.split('\n');

    let diff = '';
    for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
        if (lines1[i] !== lines2[i]) {
            diff += `第${i + 1}行不同:\n文件1: ${lines1[i] || '空'}\n文件2: ${lines2[i] || '空'}\n\n`;
        }
    }

    return diff || '两个文件相同';
}
