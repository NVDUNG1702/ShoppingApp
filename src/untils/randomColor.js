export const getRandomColor = () => {
    // const letters = '89ABCDEF'; // Chỉ dùng các giá trị cao để tạo màu sáng
    // let color = '#';
    // for (let i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * letters.length)];
    // }
    // const red = Math.floor(Math.random() * 128) + 128;   // Giá trị từ 128 đến 255
    // const green = Math.floor(Math.random() * 128) + 128; // Giá trị từ 128 đến 255
    // const blue = Math.floor(Math.random() * 100) + 155;  // Giá trị từ 155 đến 255, tránh xanh đậm
    // // return {color};
    // return (red, green, blue)
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 3; i++) {
        let segment;
        do {
            segment = letters[Math.floor(Math.random() * 6) + 10]; // Chỉ chọn từ A đến F để tránh màu đậm
        } while (segment === 'C' || segment === 'D' || segment === 'E'); // Tránh các màu quá gần với đậm
        color += segment + letters[Math.floor(Math.random() * 16)];
    }
    return color
};

