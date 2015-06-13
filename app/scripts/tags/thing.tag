<thing>
    <h2>{ opts.greeting } { val }!</h2>

    <ul>
        <li each="{ key, val in items }"> { key } = { val } </li>
    </ul>
    <ul>
        <li each="{ val in otherList }"> { val } </li>
    </ul>

    <p>
        { data }
    </p>
    <p>
        { name }
    </p>

    <script>
        this.val = 'erik'
        this.items = {
            'one': 'asdf',
            'two': 'qwer',
            'three': 'zxcv',
            'four': 'oiuy'
        };

        this.data = null;

        this.on('mount', function () {
            console.log('mount has occured');
            opts.load(this);
        });

        this.on('data_loaded', function (list) {
            console.log('data has been loaded');
            otherList = list;
            console.log(list);
            this.update();
        })

    </script>

</thing>


