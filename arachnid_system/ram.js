let buffer_data;
let bytes_used = 0;
let next_byte = 0;
let views = [];
let open_spaces = {}

export function init(allocation) {
    buffer_data = new ArrayBuffer(allocation); 
    console.log('Arachnid-System R.A.M initialized.\n', 'Total Bytes Allocated:', allocation);
}

export function allocate(length) {
    const view = new DataView(buffer_data, next_byte);
}

const RAMSegment = function(length) {
    this.view = new DataView(buffer_data, next_byte);
}

RAMSegment.prototype.allocate = function(TypedArray, length) {

}

RAMSegment.prototype.free = function( ) {
    views.splice(views.indexOf(this), 1);
    bytes_used -= this.view.byteLength;
}

