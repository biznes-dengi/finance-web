import {ReactNode} from 'react';
import {cn, useResponsive} from '@shared/lib';
import {Icon, Spinner, useUploadField} from '@shared/ui';

export function GoalImageField({children}: {children: ReactNode}) {
	const {UploadField, startUploading, abortUploading, uploadProgressPercent, isUploading, isFileDragging} =
		useUploadField();

	const {isDesktop} = useResponsive();

	return (
		<UploadField onUpload={alert}>
			<div
				className={cn(
					'flex h-[310px] flex-col items-end justify-between bg-secondary-grey',
					isUploading && 'bg-secondary-grey',
				)}
			>
				{children}

				{isFileDragging && (
					<div className='h-10 w-10 self-center text-primary-violet'>
						<Icon type='uploadImage' />
					</div>
				)}

				{isUploading && (
					<div className='cursor-default self-center text-center'>
						<div className='mb-4 font-semibold text-primary-violet'>{uploadProgressPercent}%</div>
						<div
							className={cn('cursor-pointer text-sm underline', isDesktop && 'hover:text-primary-violet')}
							onClick={abortUploading}
						>
							Cancel uploading
						</div>
					</div>
				)}

				<div
					className='mb-4 mr-4 flex size-10 items-center justify-center rounded-full bg-primary-violet text-white shadow-[0_0_0_4px_white_inset]'
					onClick={startUploading}
				>
					{!isUploading ? <Icon type='uploadImage' /> : <Spinner className='z-20 h-5 w-5' />}
				</div>
			</div>
		</UploadField>
	);
}
