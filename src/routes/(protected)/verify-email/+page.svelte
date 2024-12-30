<script lang='ts'>
    import type { PageServerData } from './$types';
    let { data }: { data: PageServerData } = $props();

</script>

<h1>이메일확인</h1>
<p>발송된 이메일에 포함된 인증코드를 입력하세요.</p>
<p>{data.user.name} 님의 이메일 인증상태는 {data.user.emailVerified} 입니다.</p>