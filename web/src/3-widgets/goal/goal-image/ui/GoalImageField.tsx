import {ReactNode} from 'react';
import {cn, useResponsive} from '@shared/lib';
import {Icon, LoadingWrapper, Spinner, useUploadField} from '@shared/ui';
import {GoalModel} from '@entities/goal';
import {useParams} from 'react-router-dom';

export function GoalImageField({children}: {children: ReactNode}) {
	const {id} = useParams();

	const {isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	// const {UploadField, startUploading, abortUploading, uploadProgressPercent, isUploading, isFileDragging} =
	// 	useUploadField();
	const {UploadField, abortUploading, uploadProgressPercent, isUploading, isFileDragging} = useUploadField();

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

				<div className='mb-4 mr-4'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='size-8 rounded-full'>
						<div
							className='flex size-8 items-center justify-center rounded-full bg-primary-violet text-white shadow-[0_0_0_2px_white_inset]'
							// onClick={startUploading}
							onClick={() => alert('Да, скоро можно будет загружать картинки 😁')}
						>
							{!isUploading ? <Icon type='uploadImage' className='size-4' /> : <Spinner className='size-4' />}
						</div>
					</LoadingWrapper>
				</div>
			</div>
		</UploadField>
	);
}
