import React, {ChangeEvent, ReactNode, useId, useRef, useState} from 'react';

import {APP_ICON} from '@shared/ui';

import {cn} from '@shared/lib';

export type Props = {
	onUpload: (data: unknown) => void;
	className: string;
	children: ReactNode;
};

/**
 * Подумать как сделать, чтобы UploadField был враппером над компонентами, куда можно кидать фотки, т.к. сейчас маленькая область куда можнтм кинуть и то курсор закрывает и не видно. В goalDetails чтобы можно было дропать на всю картинку
 * */

export function UploadField(props: Props) {
	const {onUpload, children, className} = props;

	const [progress, setProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const [isFileDragging, setIsFileDragging] = useState(false);

	const abortUploadingRef = useRef<() => void>();

	const abortUploading = () => {
		abortUploadingRef.current?.();
		setIsUploading(false);
		setProgress(0);
	};

	const handleFile = (file: File) => {
		// Если уже загружаем файл или файла нет - ничего не делать
		if (isUploading || !file) return;

		setIsUploading(true);

		onUpload(file);

		setIsUploading(false);

		// For integration with BE
		// type T = any;

		// const url = '';
		// const uploadingPromise = upload<T>(file, url, {onProgress: setProgress});
		// abortUploadingRef.current = uploadingPromise.abort;
		//
		// uploadingPromise
		// 	.then(onUpload)
		// 	.catch(() => {})
		// 	.finally(() => {
		// 		setIsUploading(false);
		// 		setProgress(0);
		// 	}); // Хоть ошибка, хоть успех - сбрасываем загрузку и прогресс
	};
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		// event.target - ссылка на инпут
		// target.files - список файлов инпута, из которого берем единственный файл

		if (!event.target.files?.length) return;
		handleFile(event.target.files[0]);
	};

	const onDragOver = (e: React.DragEvent<HTMLElement>) => {
		// Вызывается когда перемещаем файл. Нужен чтоб поменять UI, который покажет, что сюда можно дропать файлы

		e.preventDefault();
		setIsFileDragging(true);
	};
	const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
		// Вызывается когда мышь с файлом покинула компонент. Нужен для сброса отображения drop.

		e.preventDefault();
		setIsFileDragging(false);
	};
	const onDrop = (e: React.DragEvent<HTMLElement>) => {
		// Вызывается когда роняем сюда файлы

		e.preventDefault();

		const droppedFile = e.dataTransfer.files[0];
		setIsFileDragging(false);

		//Отправляем файл на сервер
		handleFile(droppedFile);
	};

	// Хорошая практика связывать label и input
	const id = useId();

	return (
		<div
			// uploadWrapper нужен, чтобы блокировать нажатие на input absolute лоадингом
			role='uploadWrapper'
			className={cn('relative', className)}
			onDrop={onDrop}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
		>
			<label htmlFor={id}>
				{!isFileDragging ? children : APP_ICON.uploadImage}

				<input type='file' className='hidden' onChange={handleFileChange} id={id} />
			</label>

			{isUploading && (
				<div>
					<div className='absolute left-0 top-0 h-full w-full'>Uploaded {progress}%</div>
					{/* Если у юзера медленный инет, долго грузится фотка, он сможет отменить загрузку */}
					<div onClick={abortUploading}>Cancel upload</div>
				</div>
			)}
		</div>
	);
}
