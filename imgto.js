const pixels = require('image-pixels');
 
function toHexString(byteArray) {
	return Array.from(byteArray, function(byte) {
		return ('0' + (byte & 0xFF).toString(16)).slice(-2);
	}).join('')
}

function chonkmd(a, width){
	let r = [];
	for (let i = 0; i < a.length; i += width){
		r.push(a.slice(i, i + width));
	}
	return r;
}

function copy(data){
	var proc = require('child_process').spawn('pbcopy'); 
	proc.stdin.write(data);
	proc.stdin.end();
}

async function main(){
	let f = await pixels('./samples/big2.png');
	let r = [];
	for (let i = 0; i < f.data.length; i += 4){
		r.push("#" + toHexString(f.data.slice(i, i + 3)));
	}
	let result = "[\n" + chonkmd(r, f.width).map(line => `\t${JSON.stringify(line)}`).join(",\n") + "\n]";
	copy(result);
	console.log("Saved to clipboard");
}
main();