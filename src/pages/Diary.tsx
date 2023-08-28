import DiaryEntry from '../components/DiaryEntry'
import DiaryPosts from '../components/DiaryPosts'

function Diary() {
  return (
    <div className="diaryContainer">
      < DiaryEntry />
      < DiaryPosts/>
    </div>
  )
}

export default Diary
