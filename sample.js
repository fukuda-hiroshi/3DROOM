$('#filesearch').on('click ',function(){
	alert("fileseach");
	var fso, fd, fs, it;
	var target = './models/';

	fso = new ActiveXObject('Scripting.FileSystemObject');

	// https://msdn.microsoft.com/ja-jp/library/cc428096.aspx
	fd = fso.GetFolder(target); // 指定フォルダのFolderオブジェクトを返す。
	print('FolderName : ' + fd.Name);
	print('FolderPath : ' + fd.Path);
	print('---');
	print('ParentFolderPath : ' + fd.ParentFolder.Path);

	//ファイルリスト表示
	print('--Files--');
	fs = fd.files;            // フォルダ内のFileコレクションを返す。
	for (it = new Enumerator(fs); !it.atEnd(); it.moveNext()){
		print(it.item());
	}

	//サブフォルダリスト表示
	print('--Sub Folders-');
	fs = fd.SubFolders;       // フォルダ内のFoldersコレクションを返す。
	for (it = new Enumerator(fs); !it.atEnd(); it.moveNext()){
		print(it.item());
	}
});